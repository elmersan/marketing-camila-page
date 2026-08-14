import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { buildPilotConfirmationEmail } from "../emails/pilotConfirmation";

const APPLICATIONS_CLOSE_AT = new Date("2026-09-01T05:00:00.000Z");

const optionalText = (maxLength: number) =>
  z.string().trim().max(maxLength).transform((value) => value || null);

export const server = {
  submitPilotApplication: defineAction({
    input: z.object({
      firstName: z.string().trim().min(1).max(80),
      lastName: z.string().trim().min(1).max(80),
      whatsapp: z.string().trim().regex(/^9[0-9]{8}$/),
      email: z.email().trim().max(254),
      agentId: z.string().trim().toUpperCase().regex(/^[0-9]{5}-(PN|PJ)(-MVCS)?$/),
      company: optionalText(120),
      city: optionalText(100),
      experienceRange: z.enum(["less_than_1", "between_1_and_3", "between_3_and_5", "more_than_5"]),
      consentCommercial: z.boolean().refine((value) => value),
      locale: z.enum(["es", "en"]),
    }),
    handler: async (input) => {
      if (new Date() >= APPLICATIONS_CLOSE_AT) {
        throw new ActionError({ code: "BAD_REQUEST", message: "APPLICATIONS_CLOSED" });
      }

      const supabaseUrl = import.meta.env.SUPABASE_URL;
      const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseServiceRoleKey) {
        console.error("Pilot application storage is missing its Supabase server configuration.");
        throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: "FORM_UNAVAILABLE" });
      }

      const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });

      const { data: application, error: insertError } = await supabase
        .from("landing_page_form")
        .insert({
          first_name: input.firstName,
          last_name: input.lastName,
          whatsapp: input.whatsapp,
          email: input.email,
          agent_id: input.agentId,
          company: input.company,
          city: input.city,
          experience_range: input.experienceRange,
          consent_commercial: input.consentCommercial,
          locale: input.locale,
        })
        .select("id")
        .single();

      if (insertError?.code === "23505") {
        throw new ActionError({ code: "CONFLICT", message: "DUPLICATE_WHATSAPP" });
      }

      if (insertError || !application) {
        console.error("Unable to save pilot application.", insertError);
        throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: "FORM_UNAVAILABLE" });
      }

      let emailSent = false;
      const resendApiKey = import.meta.env.RESEND_API_KEY;

      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        const message = buildPilotConfirmationEmail(input.firstName);
        const { error: emailError } = await resend.emails.send({
          from: import.meta.env.RESEND_FROM_EMAIL || "Camila AI <no-reply@marketing.brandlift.pe>",
          to: input.email,
          subject: message.subject,
          html: message.html,
          text: message.text,
          headers: { "X-Entity-Ref-ID": application.id },
        });

        if (emailError) {
          console.error("Pilot application saved, but its confirmation email failed.", emailError);
        } else {
          emailSent = true;
          const { error: updateError } = await supabase
            .from("landing_page_form")
            .update({ confirmation_email_sent_at: new Date().toISOString() })
            .eq("id", application.id);

          if (updateError) console.error("Unable to record confirmation email delivery.", updateError);
        }
      } else {
        console.error("Pilot application saved, but RESEND_API_KEY is not configured.");
      }

      return { saved: true, emailSent };
    },
  }),
};
