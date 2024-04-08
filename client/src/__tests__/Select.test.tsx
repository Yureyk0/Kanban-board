import { fireEvent, render, screen } from "@testing-library/react";
import { Select, SelectProps } from "../componets/Select";

describe("Select Component", () => {
  const mockSetValue = vi.fn();

  const defaultProps: SelectProps = {
    value: "option1",
    setValue: mockSetValue,
    name: "testSelect",
    data: [
      { value: "option1", text: "Option 1" },
      { value: "option2", text: "Option 2" },
      { value: "option3", text: "Option 3" },
    ],
  };

  it("renders select element with options correctly", () => {
    const component = render(<Select {...defaultProps} />);
    expect(component).toMatchSnapshot();
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(defaultProps.data.length);

    defaultProps.data.forEach((option, index) => {
      expect(options[index]).toHaveValue(option.value);
      expect(options[index]).toHaveTextContent(option.text);
    });

    expect(selectElement).toHaveValue(defaultProps.value);
  });

  it("calls setValue handler when an option is selected", () => {
    render(<Select {...defaultProps} />);

    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "option2" } });

    expect(mockSetValue).toHaveBeenCalledTimes(1);
  });
});
