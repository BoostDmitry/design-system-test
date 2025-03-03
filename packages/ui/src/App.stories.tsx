import type { Meta, StoryObj } from "@storybook/react";
import { App } from "./App";

export default {
  title: "ui/Button",
  component: App,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof App>;

type Story = StoryObj<typeof App>;

export const Default = {
  args: {
    label: "Click me",
    size: "medium",
  },
} satisfies Story;
