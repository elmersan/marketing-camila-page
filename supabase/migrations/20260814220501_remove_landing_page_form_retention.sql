select cron.unschedule(jobid)
from cron.job
where jobname = 'delete-expired-landing-page-form';

comment on table public.landing_page_form is
  'Camila pilot program applications submitted from the marketing landing page.';
