import { fireEvent, render, screen } from "@testing-library/react";
import Button, { ButtonProps } from "../componets/Button";

describe("Button Component", () => {
  const mockOnClick = vi.fn();

  const defaultProps: ButtonProps = {
    onClick: mockOnClick,
    disabled: false,
    className: "custom-class",
    type: "primary",
    children: <span>Click me!</span>,
  };

  it("renders button correctly", () => {
    const component = render(<Button {...defaultProps} />);

    expect(component).toMatchSnapshot();

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveTextContent("Click me!");

    expect(buttonElement).toHaveClass("custom-class");

    expect(buttonElement).toHaveClass("text-white");
  });

  it("calls onClick handler when button is clicked", () => {
    render(<Button {...defaultProps} />);

    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when disabled prop is true", () => {
    const disabledProps: ButtonProps = { ...defaultProps, disabled: true };
    render(<Button {...disabledProps} />);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeDisabled();
  });
});
