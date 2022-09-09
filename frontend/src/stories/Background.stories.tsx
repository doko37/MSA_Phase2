import { Story, Meta } from "@storybook/react/types-6-0"
import Background from "../components/Background";

export default {
    title: "Background",
    component: Background,
} as Meta;

export const Basic: Story = (args) => <Background isDay={true} {...args} />