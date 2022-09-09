import Panel from "../components/Panel"
import { Story, Meta } from "@storybook/react/types-6-0"
import { number } from "prop-types";

export default {
    title: "Panel",
    component: Panel,
    argTypes: {
        numItems: { type: "number", defaultValue: 3 }
    }
} as Meta;

export const Basic: Story = (args) => (
    <Panel
        borderRadius="sm"
        width={600}
        display="flex"
        justifyContent="space-evenly"
        paddingY={2}
        paddingX={2}
        {...args}
    >
        {Array.from(Array(args.numItems).keys()).map(i => (
            <p key={i}>Item{i + 1}</p>
        ))}
    </Panel>
)

