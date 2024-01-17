import React from 'react'
import styled from 'styled-components';


interface ButtonStyle {
    $bgcolor? : string // styled-components 의 props가 DOM으로 안보내지게 하기위해선 앞에 $ 를 붙여줍니다.
    color? : string
}

interface Props extends ButtonStyle{
    children : React.ReactNode,
    style? : React.CSSProperties
    onClick? : React.MouseEventHandler
}

// 버튼 스타일
const ButtonStyled = styled.button<ButtonStyle>`
    border-radius : 5px;
    border : 1px solid #ccc;
    display : flex;
    align-items: center; 
    justify-content: center;
    height : 50px;
    cursor: pointer;
    background : ${props => props.$bgcolor || '#fff'};
    color : ${props => props.color || "#000"};
`;


export default function Button(
    { children, style, $bgcolor, color }
    : Props
) {
    return (
        <ButtonStyled style={style} $bgcolor={$bgcolor} color={color} >{children}</ButtonStyled>
    )

}