# Feature: Email confirmation

## Objective
Send the person who completed the guard-duty record a complete plain-text copy after the Google Form response is saved.

## Scope
- Extend the Google Apps Script email flow.
- Preserve successful form submission when email delivery fails.
- Surface a warning in the frontend when no copy was delivered.

## Constraints
- No attachments or Drive links in the email.
- Visible sender name: `Enfermeria SeLIAR SFE`.
- Email is sent only after `FormResponse.submit()` succeeds.

## Tasks
- [x] EMAIL-001 Add complete email body and post-submit MailApp delivery to `Code.gs`.
- [x] EMAIL-002 Propagate email delivery status through the server function.
- [x] EMAIL-003 Show the requested warning when the form is saved but email delivery fails.
- [x] EMAIL-004 Run applicable checks and record results.

## Acceptance criteria
- A valid submission is saved in the Google Form before email delivery is attempted.
- The email contains all submitted fields, inventory states, observations, and confirmations.
- A mail failure does not turn an already-saved form response into a retryable submission failure.
- The frontend warns the user when no email copy was sent.

## Progress
- Completed all implementation tasks.
- `npm run lint -- --no-fix`: passed.
- `node -e "new Function(...)"` against `docs/google-apps-script/Code.gs`: passed.

## Next step
- Deploy the updated Apps Script and authorize `MailApp`, then test one successful and one email-failure submission.
