import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoBackspaceOutline } from "react-icons/io5";
import Button from './component/Button';

const AppStyled = styled.div`
  display : flex;
  align-items: center; 
  justify-content: center;
  height : 100%;
`;

const Box = styled.div`
  width : 350px;
  background : #fff;
  margin : 0 auto;
  border : 1px solid #ccc;
  border-radius: 5px;
  padding : 10px;
  box-sizing : border-box;
`;

const Grid = styled.div`
  display : grid;
  grid-template-columns : repeat(4, 1fr);
  width : 100%;
  gap : 5px;
`;

const Input = styled.input`
  font-size : 20px;
  text-align: right;
  width : 100%;
  height : 30px;
  padding : 0 0.5em;
  box-sizing : border-box;
`

function App() {

  // 키패드에 보여줄 number
  const [keypad,setKeypad] = useState('0');

  // input 가져오기
  const [input,setInput] = useState('0');

  useEffect(()=>{

    const keyDownHandler = (e : KeyboardEvent)=>{
        
      e.preventDefault();

      switch(e.key){
        case "Backspace" :
            // 마지막 문자열 삭제
            removeHanlder();
          break
        case "/" :
            
          break
        case "%" :

          break
        
      }

    }

    window.addEventListener('keydown',keyDownHandler);

    return ()=>{
      window.removeEventListener('keydown',keyDownHandler);
    }

  });

  useEffect(()=>{

    // 로컬 환경에 따라 , 가 찍히게
    let number = parseFloat(input).toLocaleString();
    setKeypad(number);

  },[input]);

  // 초기화 이벤트
  const resetHanlder = ()=>{
    setInput('0');
  }

  // 한글자씩 삭제
  const removeHanlder = ()=>{
    // 마지막 문자열 삭제
    if(input === '0'){
      return;
    }
    setInput((prev)=> prev.slice(0,-1));
  }

  const addHanlder = (e : number | string)=>{

    let val = e.toString();

    if(/^[0-9]*$/.test(val)){
      setInput(input + val);
    }

  }

  return (
    <AppStyled>
      
      <Box>
        
        <Input type='text' value={keypad} readOnly />

        <Grid style={{marginTop : 10}}>
          <Button onClick={removeHanlder}><IoBackspaceOutline /></Button>
          <Button onClick={resetHanlder}>C</Button>
          <Button>%</Button>
          <Button>/</Button>
          { 
            [7,8,9].map((e,i)=><Button onClick={()=>addHanlder(e)} key={i}>{e}</Button>)
          }

          <Button>x</Button>
          
          <Button>4</Button>
          <Button>5</Button>
          <Button>6</Button>

          <Button>-</Button>

          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>

          <Button>+</Button>

          <Button style={{gridColumn : "2 span"}} >0</Button>

          <Button>.</Button>

          <Button>=</Button>

          {/* bgColor={"#f15d5d"} color={"#fff"}  */}
        </Grid>

      </Box>
      
    </AppStyled>
  );

}

export default App;
