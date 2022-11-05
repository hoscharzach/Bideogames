import styled, { css } from "styled-components";

export const Message = styled.div`
width: 100%;
color: white;`

export const ChatMessages = styled.div`
background-color: #40444b;
width: 500px;
border-radius: 8px;
padding: 0.6em 1.2em;

${props => props.height && css`
height: ${props.height}rem`}

${props => props.width && css`
width: ${props.width}rem`}
`
export const ChatInput = styled.input`
background-color: #40444b;
border-radius: 8px;
padding: 0.6em 1.2em;
width: 70%;
`
