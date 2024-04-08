export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "primary" | "outline";
  children: JSX.Element;
}

const Button = ({
  onClick,
  disabled = false,
  className = "",
  type = "primary",
  children,
}: ButtonProps) => {
  const buttonStyle =
    type === "submit"
      ? `bg-blue-500  text-white  ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`
      : type === "outline"
        ? "bg-transparent hover:bg-gray-100 py-1 px-2 border border-solid rounded font-medium"
        : "hover:bg-gray-500 py-1 px-2 border border-solid rounded bg-gray-600 text-white";

  return (
    <button
      className={`px-4 py-2 rounded focus:outline-none ${buttonStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type === "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
