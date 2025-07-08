# Testing React with RTL

This repo is used for the RTL intro and first exercise!

For the lecture the `Counter.tsx` component is used.

For the exercise:

### ✅ Test Plan for `ContactForm` Component

This is a list of behaviors and states to test based on the implementation of the `ContactForm` component.

### 1. Static Rendering

- [ ] Renders form with the title "Contact Us"
- [ ] Contains inputs for:

  - Name
  - Email
  - Message
  - Subscribe to newsletter (checkbox)
  - Submit button

- [ ] All inputs have correct placeholders and labels
- [ ] Submit button is initially enabled
- [ ] No error messages are visible on initial render

### 2. Validation Errors (Client-side)

- [ ] Shows "Name is required" when name is empty
- [ ] Shows "Email is required" when email is empty
- [ ] Shows "Email is invalid" for invalid email format
- [ ] Shows "Message is required" when message is empty
- [ ] Multiple validation errors can be displayed at once

### 3. Successful Submission Behavior

- [ ] Displays success message: "Thank you for your message!"
- [ ] Hides the form after successful submission
- [ ] Submitting with checkbox checked still allows success

### 4. Submission State

- [ ] Disables submit button while submitting
- [ ] Displays loading spinner while `isPending` is true

### 5. Field Highlighting

- [x] Inputs with errors get the `input-error` or `textarea-error` class
- [x] Inputs without errors have default styling

### 6. Accessibility & Roles (Optional, Recommended)

- [ ] Inputs are accessible by their labels
- [ ] Submit button has appropriate role
- [ ] Error messages are visible to screen readers

---

### ✅ Test Plan for `UserList` Component

This document outlines key behaviors and states to test in the `UserList` component.

### 1. Initial Loading State

- [ ] Shows loading spinner and message "Loading users..." while fetching data

### 2. Successful Fetch

- [ ] Renders the title "User Directory"
- [ ] Displays a search input and a clear (×) button
- [ ] Displays a table of users (name, username, email) when data loads
- [ ] All fields are correctly populated

### 3. Error Handling

- [ ] Shows error alert when fetch fails
- [ ] Displays the error message from the thrown error
- [ ] Retry button appears and triggers re-fetching

### 4. Search Functionality

- [ ] Typing into the search input filters users by name, email, or username
- [ ] Search is case-insensitive
- [ ] Shows "No users found..." message when no match exists
- [ ] Clear (×) button clears the input and restores the full list
- [ ] Clear button is disabled when search input is empty

### 5. Highlighting Search Matches

- [ ] Matched terms in name, username, or email are wrapped in a `<mark>` tag
- [ ] Highlights appear in yellow with correct styles

### 6. Refresh Button

- [ ] Clicking "Refresh" re-triggers data fetching
- [ ] Works when no error is present
