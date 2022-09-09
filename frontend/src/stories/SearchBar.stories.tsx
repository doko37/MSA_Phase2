import { Story, Meta } from "@storybook/react/types-6-0"
import Panel from "../components/Panel";
import SearchBar from "../components/SearchBar";
import SearchButton from "../components/SearchButton";

export default {
    title: "SearchBar",
    component: SearchBar,
} as Meta;

export const Basic: Story = (args) => {
    return (
        <Panel
            borderRadius="md"
            display="flex"
            justifyContent="center"
            paddingY={1}
            paddingX={1}
            {...args}
        >
            <SearchBar value="Value" onChange={() => console.log("User is typing...")} changeCity={() => console.log("User has submitted")} {...args} />
            <SearchButton Search={() => console.log("I'm being pressed")} {...args} />
        </Panel>
    )
}