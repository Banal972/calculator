import React from 'react'
import styled from 'styled-components';

type Props = {
    children : React.ReactNode,
    style? : React.CSSProperties,
    onClick? : React.MouseEventHandler
}

// 버튼 스타일
const ButtonStyled = styled.button`
    border-radius : 5px;
    border : 1px solid #ccc;
    display : flex;
    align-items: center; 
    justify-content: center;
    height : 50px;
    cursor: pointer;
    background : #fff;
    color : #000;
`;

/* ButtonStyled.defaultProps = {
    bgColor : '#fff',
    color : '#000'
} */

export default function Button(
    { children, style, ...rest }
    : Props
) {

    return (
        <ButtonStyled style={style} {...rest} >{children}</ButtonStyled>        
    )

}

