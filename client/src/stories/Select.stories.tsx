import { Meta, StoryFn } from "@storybook/react";
import { Select, SelectProps } from "../componets/Select";

const meta: Meta = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    setValue: { action: "setValue triggered" },
  },
  tags: ["autodocs"],
};

export default meta;

const Template: StoryFn<SelectProps> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "",
  name: "exampleSelect",
  data: [
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2" },
    { value: "option3", text: "Option 3" },
  ],
  setValue: (event) => console.log(event.target.value),
};
