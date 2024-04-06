interface SelectProps {
  setValue: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  value: string;
  name: string;
  data: {
    value: string;
    text: string;
  }[];
}
export const Select = ({ value, setValue, name, data }: SelectProps) => {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={(event) => setValue(event)}
      className="w-full px-3 py-1 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
    >
      {data.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};
