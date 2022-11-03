import styled, { css } from "styled-components";

export const FlexContainer = styled.div`
height: 100%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;

${props => props.col && css`
flex-direction: column;`}

${props => props.margin && css`
margin: ${props.margin}rem;`}

${props => props.gap && css`
gap:1rem`}
`
