# Google Apps Script bridges

Each SeLIAR workflow has an isolated Apps Script deployment and Google Form contract.
Keep bridge files flat in this directory: use names such as `cambioGuardia.gs`,
`compensatorio.gs`, and `lao.gs`; do not create one folder per workflow.

## Cambio de guardia

1. Create a standalone Apps Script project and paste `cambioGuardia.gs`.
2. In **Project Settings → Script properties**, add `CAMBIO_GUARDIA_SECRET` with a
   strong secret value.
3. Deploy it as a web app that accepts POST requests from the SeLIAR server.
4. Configure the application server with:
   - `GOOGLE_APPS_SCRIPT_CAMBIO_GUARDIA_URL`
   - `GOOGLE_APPS_SCRIPT_CAMBIO_GUARDIA_SECRET`

The browser sends the request only to the TanStack server function. That function
adds the secret server-side before calling Apps Script, so neither Apps Script secret
is exposed to browser code.

Cambio sends a required `requesterEmail` field and a validated `emailRequested` boolean.
The bridge stores the address in the explicit required Google Form item `1891793506`.
It sends an email copy with `MailApp` only when `emailRequested` is `true`, and only
after the Form response is saved. Google Forms automatic email collection may remain
enabled. Authorize `MailApp` when deploying or running the bridge. If email was
requested but delivery fails, the saved Form response still succeeds and the browser
shows a warning; when email was not requested, no delivery warning is shown.

## Existing Control de guardia deployment

Control remains independent. Do not rename or reuse its existing
`GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_APPS_SCRIPT_SECRET` variables for Cambio.
Its bridge continues to be `Code.gs`.
The user can opt in to a copy with the final-send checkbox. The server validates the
choice and passes it separately from the unchanged Form registration payload; `Code.gs`
calls `MailApp` only when the choice is true and only after the Form response is saved.
An email failure does not undo the saved response.

## Compensatorio

1. Create a separate standalone Apps Script project and paste `compensatorio.gs`.
2. In **Project Settings → Script properties**, add `COMPENSATORIO_SECRET` with a
   strong secret value.
3. Automatic Google Forms email collection must be **OFF** for this bridge. The
   bridge submits `FormResponse` objects programmatically and cannot populate
   Google's respondent-email metadata. The Form currently contains the required
   explicit text item `Correo electrónico` (item ID `1851963092`). Run
   `setupCompensatorioEmailField()` from the Apps Script editor; the helper disables
   automatic collection, keeps the explicit item required, and logs its actual ID.
4. Deploy the project as an independent web app that accepts POST requests from the
   SeLIAR server. Authorize `MailApp` when prompted, then redeploy the updated script.
5. Configure the application server with:
   - `GOOGLE_APPS_SCRIPT_COMPENSATORIO_URL`
   - `GOOGLE_APPS_SCRIPT_COMPENSATORIO_SECRET`

The bridge resolves `Correo electrónico` by title at submission time and keeps the
refreshed ID `1851963092` in its known Form contract. It sends the optional copy only
when the validated `emailRequested` request value is true, after saving the response.
If automatic collection is
still enabled, the bridge stops before submission with an operator-facing error;
it never mutates the production Form settings per request. Refresh
`docs/google-apps-script/datosForm.json` if the Form schema changes again. The Form
response is saved before the MailApp copy is sent; if email delivery fails, the
saved request still succeeds and the browser shows a warning.

## LAO

1. Create a separate standalone Apps Script project and paste `lao.gs`.
2. In **Project Settings → Script properties**, add `LAO_SECRET` with a strong secret
   value.
3. Automatic Google Forms email collection must be **OFF** for this programmatic
   bridge. The Form contains the required explicit text item `Correo Electrónico`
   (item ID `1849920835`). Run `setupLaoEmailField()` from the Apps Script editor;
   the helper disables automatic collection, keeps the explicit item required, and
   logs its actual ID.
4. Deploy the project as an independent web app that accepts POST requests from the
   SeLIAR server. Authorize `MailApp` when prompted, then redeploy the updated script.
5. Configure the application server with:
   - `GOOGLE_APPS_SCRIPT_LAO_URL`
   - `GOOGLE_APPS_SCRIPT_LAO_SECRET`

The bridge resolves `Correo Electrónico` by title at submission time and submits the
first day of the selected start month to the existing Google Forms date item. It sends
the optional copy only when the validated `emailRequested` request value is true,
after saving the response. It validates the requested dates and email address, but does not attempt to enforce
seniority or simultaneous-license limits because those values are not collected by
the Form. The Form response is saved before the MailApp copy is sent; if email
delivery fails, the saved request still succeeds and the browser shows a warning.

## Published schedule viewer

This viewer uses its own standalone Apps Script project. Paste `PublishedSchedule.gs` into
that project; do not add it to `Code.gs` or another form bridge. In **Project Settings →
Script properties**, configure:

- `PUBLISHED_SCHEDULE_FOLDER_ID`: the ID of the Drive folder that contains the one current PDF.
- `PUBLISHED_SCHEDULE_SECRET`: a strong shared secret.

Deploy the script as a web app that accepts requests from the app server. Configure the
server-only variables `GOOGLE_APPS_SCRIPT_SCHEDULE_URL` and
`GOOGLE_APPS_SCRIPT_SCHEDULE_SECRET` in the hosting environment. The browser calls a
TanStack server function; it never receives either the Apps Script URL or shared secret.

The endpoint fails closed unless the folder contains exactly one file and that file has
the `application/pdf` MIME type. After deployment, make the current PDF viewable by the
intended app audience. In the file's Drive sharing/settings controls, disable reader
download, print, and copy when those controls are available. The app embeds Drive's
preview and has no download button or archive list. These settings do not prevent
screenshots or other technical capture of content that a reader can view.

### Coordinator update procedure

Replace the existing PDF in the configured folder rather than adding another file:
remove or move the old PDF out of that folder, then add the new PDF. Keep the folder ID
and file-sharing settings unchanged. The app reads the folder on each request, so the
same `/horarios` route picks up the replacement without a frontend edit or redeployment.
Do not keep prior schedules in this folder; the endpoint intentionally reports an error
if it finds more than one file or a non-PDF file.

## Future bridges

For each new form, create a separate flat `.gs` bridge, deploy it independently,
and add a dedicated pair of server-only URL and secret environment variables. Keep
the Form ID and Script Property key scoped to that bridge.
