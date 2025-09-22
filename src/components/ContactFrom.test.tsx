// import from testing lib
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import for another test function
// import component
import ContactForm from "./ContactForm";

describe("Test the Contact Form Component", () => {
	describe("Initial rendering", () => {
		// Test for Headline
		it("Static rendering", () => {
			// setup/arrange
			render(<ContactForm />);
			// act -> nothing to do
			// assert headline for initial/static rendering
			expect(
				screen.getByRole("heading", { name: /contact us/i })
			).toBeInTheDocument();
		});
		// Tests forInput Fields and linking between Labels
		it("Test input fields after initial rendering", () => {
			// arrange
			render(<ContactForm />);

			// act -> nothing to do because its still initial and static
			// -------------------------------------------------------------
			// assert for Label for the name input
			// Best Practice because of Screenreaders and to test Linking between Labels and Inputs
			expect(
				screen.getByRole("textbox", { name: /name/i })
			).toBeInTheDocument();
			// assert label for email
			expect(
				screen.getByRole("textbox", { name: /message/i })
			).toBeInTheDocument();
			// check for message field
			expect(
				screen.getByRole("textbox", { name: /message/i })
			).toBeInTheDocument();

			// check for placeholder texts seperately wiith another method
			expect(
				screen.getByPlaceholderText(/enter your name/i)
			).toBeInTheDocument();
			expect(
				screen.getByPlaceholderText(/enter your email/i)
			).toBeInTheDocument();
			expect(
				screen.getByPlaceholderText(/enter your message/i)
			).toBeInTheDocument();

			// assert checkbox for newsletter
			expect(
				screen.getByRole("checkbox", { name: /subscribe/i })
			).toBeInTheDocument();
			// check if Button is enabled
			expect(
				screen.getByRole("button", { name: /send message/i })
			).toBeEnabled();

			// expect NO messages with following text snippets
			expect(screen.queryByText(/is required/i)).toBeNull();
			expect(screen.queryByText(/is invalid/i)).toBeNull();
		});
	});

	// second test suite
	describe("Client Side Error Validation", () => {
		it("Show 'name is required' when name is empty", async () => {
			// arrange
			render(<ContactForm />);
			const form = screen.getByRole("form");
			// act
			// use submit methob on form elements
			fireEvent.submit(form);
			// assert within an async waitFor because of delay API Response
			await waitFor(() => {
				// await multiple things in one waitFor is valid and recommended because of performance
				expect(
					screen.queryByText(/name is required/i)
				).toBeInTheDocument();
				expect(
					screen.queryByText(/email is required/i)
				).toBeInTheDocument();
				expect(
					screen.queryByText(/message is required/i)
				).toBeInTheDocument();
			});
		});
	});
	// third test suit
	describe("Test succesful submission behaviour", () => {
		// Test in here -> async again because of delay from server
		it("Test Submission behaviour", async () => {
			// arrange with rendering
			render(<ContactForm />);

			// and assigning fields and form to ariables for easier usage
			const form = screen.getByRole("form");
			const nameInput = screen.getByLabelText(/Name \*/i);
			const emailInput = screen.getByLabelText(/Email \*/i);
			const messageInput = screen.getByLabelText(/Message \*/i);

			// act -> input values
			fireEvent.change(nameInput, { target: { value: "John Doe" } });
			fireEvent.change(emailInput, {
				target: { value: "john@gmx.de" },
			});
			fireEvent.change(messageInput, {
				target: { value: "Hello World of Tests! ;)" },
			});

			// await act(async () => {
			// 	// press submit
			// 	fireEvent.submit(form);
			// });
			fireEvent.submit(form);
			// screen.debug();

			// assert in waitFor again because of delay
			await waitFor(
				() =>
					expect(
						screen.getByText(/Thank.*message/i)
					).toBeInTheDocument(),
				{ timeout: 3000 }
			);
		});
	});
});
