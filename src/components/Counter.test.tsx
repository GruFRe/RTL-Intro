// import from testing lib
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// import for another test function
import { fireEvent } from "@testing-library/react";
// component to test
import Counter from "./Counter";

// Test logic
describe("Counter Component", () => {
	// nested description
	describe("Initial Rendering", () => {
		// first Test
		it("renders with default initial value of 0", () => {
			// renders Component into "screen"
			render(<Counter />);
			// write test using "screen"
			expect(
				// get Element by role and name, name uses regex
				screen.getByRole("heading", { name: /counter component/i })
			).toBeInTheDocument();
			// get another element by its text, or expect it to be there anywhere
			expect(screen.getByText("0")).toBeInTheDocument();
		});

		it("renders with custom initial value", () => {
			render(<Counter initialValue={5} />);
			expect(screen.getByText("5")).toBeInTheDocument();
		});

		it("renders all buttons", () => {
			render(<Counter />);
			expect(
				screen.getByRole("button", { name: "-" })
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: /reset/i })
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "+" })
			).toBeInTheDocument();
		});
	});
	//Another description for second test block
	describe("Button Functionality", () => {
		it("increments counter when + button is clicked", () => {
			// Arrange
			render(<Counter />);
			const incrementBtn = screen.getByRole("button", { name: "+" });
			// Act
			fireEvent.click(incrementBtn);
			fireEvent.click(incrementBtn);
			// Assert
			expect(screen.getByText("2")).toBeInTheDocument();
		});
		it("decrements counter when - button is clicked", () => {
			// Arrange
			render(<Counter initialValue={5} />);
			const decrementBtn = screen.getByRole("button", { name: "-" });
			// Act
			fireEvent.click(decrementBtn);
			fireEvent.click(decrementBtn);
			// Assert
			expect(screen.getByText("3")).toBeInTheDocument();
		});
		it("resets counter to initial value when reset button is clicked", () => {
			// Arrange
			render(<Counter initialValue={3} />);
			const incrementBtn = screen.getByRole("button", { name: "+" });
			const resetBtn = screen.getByRole("button", { name: /reset/i });
			// Act
			fireEvent.click(incrementBtn);
			fireEvent.click(incrementBtn);
			fireEvent.click(resetBtn);
			// Assert
			expect(screen.getByText("3")).toBeInTheDocument();
		});
	});
});
