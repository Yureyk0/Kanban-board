import { Meta, StoryFn } from "@storybook/react";
import { Modal, ModalProps } from "../componets/Modal";

const meta: Meta = {
  title: "Components/Modal",
  component: Modal,
};

const Template: StoryFn<ModalProps> = (args) => <Modal {...args} />;

export default meta;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => console.log("Modal closed"),
  children: (
    <div className="p-4">
      <h1 className="text-xl font-bold">Modal Content</h1>
      <p>This is the content of the modal.</p>
    </div>
  ),
};
