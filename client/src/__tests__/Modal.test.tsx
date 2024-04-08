import { fireEvent, render, screen } from "@testing-library/react";
import { Modal, ModalProps } from "../componets/Modal";

describe("Modal Component", () => {
  const handleClose = vi.fn();

  const defaultProps: ModalProps = {
    isOpen: true,
    onClose: handleClose,
    children: <div>Modal Content</div>,
  };

  it("renders modal when isOpen is true", () => {
    const component = render(<Modal {...defaultProps} />);

    expect(component).toMatchSnapshot();

    const modalElement = screen.getByRole("dialog");
    expect(modalElement).toBeInTheDocument();

    const modalContent = screen.getByText("Modal Content");
    expect(modalContent).toBeInTheDocument();
  });

  it("calls onClose handler when close button is clicked", () => {
    render(<Modal {...defaultProps} />);

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not render modal when isOpen is false", () => {
    const props: ModalProps = {
      ...defaultProps,
      isOpen: false,
    };

    render(<Modal {...props} />);

    const modalElement = screen.queryByRole("dialog");
    expect(modalElement).not.toBeInTheDocument();
  });
});
