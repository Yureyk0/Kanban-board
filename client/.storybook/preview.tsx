import { store } from "../src/app/store";
import { Provider } from "react-redux";
import type { Preview } from "@storybook/react";
import React from "react";
import "tailwindcss/tailwind.css";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#333333" },
      ],
    },
    layout: "centered", // Center-aligns components in the preview canvas
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export default preview;
