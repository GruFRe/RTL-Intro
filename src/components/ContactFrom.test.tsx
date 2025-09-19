// import from testing lib
import { describe, it, expect } from "vitest";
import { getByRole, render, screen, waitFor } from "@testing-library/react";
// import for another test function
import { fireEvent } from "@testing-library/react";
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
			// assert for Label for the name input
			// Best Practice because of Screenreaders and to test Linking between Labels and Inputs
			expect(
				screen.getByRole("textbox", { name: /name/i })
			).toBeInTheDocument();
			// assert label for email
			expect(
				screen.getByRole("textbox", { name: /message/i })
			).toBeInTheDocument();
			// assert checkbox for newsletter
			expect(
				screen.getByRole("checkbox", { name: /subscribe/i })
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: /send message/i })
			).toBeEnabled();
			// expect NO messages with following text snippets
			expect(screen.queryByText(/is required/i)).toBeNull();
			expect(screen.queryByText(/is invalid/i)).toBeNull();
		});
	});
	describe("Client Side Error Validation", () => {
		it("Show 'name is required' when name is empty", async () => {
			// arrange
			render(<ContactForm />);
			const form = screen.getByRole("form");
			// act
			fireEvent.submit(form);
			// assert
			await waitFor(() => {
				expect(
					screen.queryByText(/name is required/i)
				).toBeInTheDocument();
			});
		});
	});
});
