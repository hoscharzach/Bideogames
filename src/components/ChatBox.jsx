import { FlexContainer } from "./StyledComponents/FlexContainer";

export default function ChatBox({ answer }) {

    return (
        <FlexContainer col>
            <h1>{answer}</h1>
        </FlexContainer>
    )
}
