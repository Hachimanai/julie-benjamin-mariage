# Track Specification: Replace Program Hours with '--h--'

## Overview
This track involves modifying the wedding invitation's program section. The specific time values currently displayed for all events will be replaced with a placeholder text: '--h--'.

## Functional Requirements
- Locate all event time elements within the program section of the HTML document (`index.html`).
- Replace the existing time text (e.g., "15h30", "16h00") with the literal string `--h--`.
- Ensure the change is hardcoded directly into the HTML file.

## Non-Functional Requirements
- The styling of the new '--h--' text must remain identical to the original time text (same font, color, size, and alignment).
- No new CSS classes or JavaScript logic should be added for this change.

## Acceptance Criteria
- [ ] Every event in the program section displays '--h--' instead of a specific time.
- [ ] The visual alignment and styling of the program timeline remain unbroken.
- [ ] The change is verifiable by inspecting the `index.html` file source code.

## Out of Scope
- Modifying any other dates or times outside of the main program timeline.
- Implementing dynamic time reveal logic.