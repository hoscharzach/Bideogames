import styled from "styled-components";

export const MagicEightBall = styled.div`
width: 400px;
height: 400px;
border-radius: 50%;
background-color: black;
display: flex;
justify-content: center;
align-items: center;
position: relative;
&:after {
    content: '';
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
`
