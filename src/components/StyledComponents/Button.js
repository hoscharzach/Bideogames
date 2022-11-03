import styled, { css } from 'styled-components'

export const Button = styled.button`
border-radius: 8px;
border: 1px solid transparent;
padding: 0.6em 1.2em;
font-size: 1em;
font-weight: 500;
font-family: inherit;
background-color: #1a1a1a;
cursor: pointer;
transition: border-color 0.25s;
&:hover {
    border-color: #646cff;
  }

${props => props.inverted && css`
background-color: white;
color: black;
` }

`;
