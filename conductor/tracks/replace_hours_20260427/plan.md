# Implementation Plan: Replace Program Hours with '--h--'

## Phase 1: Testing Setup [checkpoint: e641e0d]
- [x] Task: Create a plain JavaScript DOM test (e.g., in a new `tests` folder) to assert that the text content of all program event times is exactly '--h--'. c2550e3
- [x] Task: Run the test and confirm it fails (Red Phase).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Testing Setup' (Protocol in workflow.md)

## Phase 2: HTML Modification [checkpoint: e74df2a]
- [x] Task: Modify `index.html` to find all program time elements in the timeline.
- [x] Task: Replace the original time strings with `--h--`. a8f87cd
- [x] Task: Run the DOM test again and confirm it passes (Green Phase).
- [x] Task: Open the file in a browser to manually verify the visual styling remains consistent.
- [x] Task: Conductor - User Manual Verification 'Phase 2: HTML Modification' (Protocol in workflow.md)