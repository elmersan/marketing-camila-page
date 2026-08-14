const requirementsUrl = "https://www.papermark.com/view/cmstcpn4f000vjm04reomvfeg";

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);

export const buildPilotConfirmationEmail = (firstName: string) => {
  const safeName = escapeHtml(firstName);

  return {
    subject: "Recibimos tu postulación al Programa Piloto de Camila",
    text: `Hola, ${firstName}:\n\nHemos recibido correctamente tu postulación al Programa Piloto de Camila. Nuestro equipo revisará la información proporcionada y se pondrá en contacto contigo por correo electrónico o WhatsApp si tu perfil cumple con los requisitos del programa.\n\nRevisa los requisitos: ${requirementsUrl}\n\nGracias por tu interés en descubrir una nueva forma de gestionar tus procesos comerciales con Camila.\n\nCAMILA AI`,
    html: `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Postulación recibida</title>
  </head>
  <body style="margin:0;background:#f5f4f5;color:#0a0317;font-family:Arial,sans-serif;padding:40px 16px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#fefcfb;border:1px solid #ebe7eb;border-radius:20px;box-shadow:0 10px 28px rgba(31,28,34,.10);">
            <tr>
              <td align="center" style="padding:56px 42px 46px;">
                <div style="font-size:22px;font-weight:700;letter-spacing:.33px;line-height:1;">CAMILA AI</div>
                <p style="margin:38px 0 10px;font-size:15px;line-height:1.5;">Postulación recibida</p>
                <h1 style="margin:0;font-size:30px;line-height:1.15;letter-spacing:-.7px;">Programa Piloto de <span style="color:#7255da;">Camila</span></h1>
                <p style="margin:24px auto 0;max-width:470px;font-size:14px;line-height:1.55;color:#3f3945;">
                  <strong>${safeName}</strong>, hemos recibido correctamente tu postulación. Nuestro equipo revisará la información proporcionada y se pondrá en contacto contigo por correo electrónico o WhatsApp si tu perfil cumple con los requisitos del programa.
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:34px auto 0;">
                  <tr>
                    <td bgcolor="#7255da" style="border-radius:9px;">
                      <a href="${requirementsUrl}" style="display:inline-block;padding:14px 54px;color:#fefcfb;font-size:14px;font-weight:700;text-decoration:none;">Revisar requisitos</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:38px 0 0;font-size:12px;line-height:1.5;color:#706a74;">Las postulaciones cierran el 31 de agosto de 2026.</p>
                <div style="width:280px;max-width:100%;margin:18px auto 0;border-top:1px solid #e5dfe5;"></div>
                <p style="margin:16px 0 0;font-size:11px;line-height:1.5;color:#aaa4ad;">Este correo confirma la recepción de tu postulación. No garantiza el ingreso al programa.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
};
