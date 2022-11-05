import styled, { css } from "styled-components";

export const FlexContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;

${props => props.w && css`
width: ${props.w === "full" ? '100%;' : `${props.w}px;`}`}
${props => props.h && css`
height: ${props.h === "full" ? '100%;' : `${props.h}px;`}`}

${props => props.col && css`
flex-direction: column;`}

${props => props.margin && css`
margin: ${props.margin}rem;`}

${props => props.mt && css`
margin-top: ${props.mt}rem`}

${props => props.gap && css`
gap:1rem`}
`
