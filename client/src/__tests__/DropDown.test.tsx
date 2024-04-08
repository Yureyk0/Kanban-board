import { fireEvent, render, screen } from "@testing-library/react";
import { DropDown, DropDownProps } from "../componets/DropDown";

describe("DropDown Component", () => {
  const handleCloseDropDown = vi.fn();
  const handleDelete = vi.fn();
  const handleEdit = vi.fn();
  const handleAddTask = vi.fn();
  const handleOpenDropDown = vi.fn();

  const defaultProps: DropDownProps = {
    handleCloseDropDown,
    handleDelete,
    handleEdit,
    handleAddTask,
    handleOpenDropDown,
    isOpen: false,
  };

  it("renders dropdown closed by default", () => {
    const component = render(<DropDown {...defaultProps} />);
    expect(component).toMatchSnapshot();

    const dropDownContainer = screen.queryByTestId("dropdown-container");
    expect(dropDownContainer).not.toBeInTheDocument();
  });

  it("renders dropdown open when isOpen is true", () => {
    const props: DropDownProps = {
      ...defaultProps,
      isOpen: true,
    };

    render(<DropDown {...props} />);

    const dropDownContainer = screen.getByTestId("dropdown-container");
    expect(dropDownContainer).toBeInTheDocument();

    const editButton = screen.getByRole("Edit");
    const deleteButton = screen.getByRole("Delete");
    const addButton = screen.getByRole("Add");

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("calls handleCloseDropDown when clicking outside dropdown", () => {
    const props: DropDownProps = {
      ...defaultProps,
      isOpen: true,
    };

    render(<DropDown {...props} />);

    fireEvent.mouseDown(document.body);

    expect(handleCloseDropDown).toHaveBeenCalledTimes(1);
  });

  it("calls handleEdit when clicking edit button", () => {
    const props: DropDownProps = {
      ...defaultProps,
      isOpen: true,
    };

    render(<DropDown {...props} />);

    const editButton = screen.getByRole("Edit");
    fireEvent.click(editButton);

    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it("calls handleAddTask when clicking add task button", () => {
    const props: DropDownProps = {
      ...defaultProps,
      isOpen: true,
      handleAddTask: handleAddTask,
    };

    render(<DropDown {...props} />);

    const addButton = screen.getByRole("Add");
    fireEvent.click(addButton);

    expect(handleAddTask).toHaveBeenCalledTimes(1);
  });

  it("calls handleDelete when clicking delete button", () => {
    const props: DropDownProps = {
      ...defaultProps,
      isOpen: true,
    };

    render(<DropDown {...props} />);

    const deleteButton = screen.getByRole("Delete");
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
