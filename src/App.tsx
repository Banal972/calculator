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

const InputStyled = styled.div`
  font-size : 26px;
  text-align: right;
  width : 100%;
  height : 30px;
  padding : 0 0.5em;
  box-sizing : border-box;
  border : none;
`

function App() {

  // 사칙연산
  const [operator,setOperator] = useState<string | null>(null);
  // 이전 입력값
  const [prevNum,setPrevNum] = useState('');
  // 다음 입력값
  const [nextNum,setNextNum] = useState('');

  // 화면에 보여주는 keypad
  const [keypad,setKeypad] = useState('0');

  // 이전 입력값 혹은 다음 입력값을 넣으면 , 를 찍어줍니다.
  useEffect(()=>{
    if(!operator){ // 사칙연산이 안들어가 있을 경우
      if(prevNum == "") return;
      setKeypad(prevNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',')); // 정규식을 이용해서 3자리 , 찍기
    }else{
      if(nextNum == "") return;
      setKeypad(nextNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',')); 
    }
  },[prevNum,nextNum,operator]);

  // 사칙연산 이벤트
  const operatorHandler = (e : string)=>{
    setOperator(e); // 사칙연산 추가
  }

  // 숫자 키패트 이벤트
  const keypadHanlder = (e : number)=>{

    // 가져온 숫자를 문자열로
    let getNumber = e.toString();

    if(!operator){
      if(e === 0 && prevNum === "") return;
      setPrevNum((prev)=> prev + getNumber);
    }else{
      if(e === 0 && nextNum === "") return;
      setNextNum((prev)=> prev + getNumber);
    }

  }

  // . 이벤트
  const dotHanlder = ()=>{
    if(!operator){
      let number = Number(prevNum);
      if(Number.isInteger(number)) setPrevNum((prev)=>prev + '.'); // 정수면 . 을 붙여줍니다.
    }else{
      let number = Number(nextNum);
      if(Number.isInteger(number)) setNextNum((prev)=>prev + '.');
    }
  }

  // 계산 이벤트
  const calcHandler = ()=>{

    let calc : number = 0
  
    if(!operator) return; // 사칙연산을 안넣으면 무시

    switch(operator){
      case "+" :
        calc = Number(prevNum) + Number(nextNum);
      break;
      case "-" :
        calc = Number(prevNum) - Number(nextNum);
      break;
      case "x" :
        calc = Number(prevNum) * Number(nextNum);
      break;
      case "/" :
        calc = Number(prevNum) / Number(nextNum);
      break;
    }

    const result = calc.toString()

    // 사칙연산 초기화 후 이전값에 저장해서 , 이벤트 발생시켜 값을 넣어줍니다.
    setOperator(null); // 사칙연산 초기화
    setPrevNum(result); // 계산값을 이전에 저장
    setNextNum(''); // 다음을 비워서 바로 계산할수있게

  }

  // 하나씩 지우기 이벤트
  const removeHanlder = ()=>{
    
    if(!operator){
      setPrevNum((prev)=>prev.slice(0,-1)) // 0,-1 을 하면 마지막껄 삭제해줍니다.
    }else{
      setNextNum((prev)=>prev.slice(0,-1))
    }
  }

  // 초기화 이벤트
  const resetHanlder = ()=>{
    setOperator(null);
    setPrevNum('');
    setNextNum('');
    setKeypad('0');
  }

  return (
    <AppStyled>
      
      <Box>

        <InputStyled>{keypad}</InputStyled>

        <Grid style={{marginTop : 10}}>

          <Button 
            onClick={removeHanlder}
            style={{gridColumn : "2 span"}}
          ><IoBackspaceOutline /></Button>

          <Button 
            onClick={resetHanlder}
          >AC</Button>
          
          <Button 
            onClick={()=>operatorHandler('/')}
          >/</Button>
          {
            [7,8,9].map((e,i)=>
              <Button 
                onClick={()=>keypadHanlder(e)} 
                key={i}
              >{e}</Button>
            )
          }
          <Button 
            onClick={()=>operatorHandler('x')}
          >x</Button>
          {
            [4,5,6].map((e,i)=>
              <Button 
                onClick={()=>keypadHanlder(e)} 
                key={i}
              >{e}</Button>
            )
          }
          <Button
            onClick={()=>operatorHandler('-')}
          >-</Button>
          {
            [1,2,3].map((e,i)=>
              <Button 
                onClick={()=>keypadHanlder(e)}
                key={i}
              >{e}</Button>)
          }
          <Button
            onClick={()=>operatorHandler('+')}
          >+</Button>
          
          <Button 
            onClick={()=>keypadHanlder(0)}
            style={{gridColumn : "2 span"}} 
          >0</Button>

          <Button 
            onClick={dotHanlder}
          >.</Button>

          <Button
            onClick={calcHandler}
            $bgcolor={"#ff5858"}
            color={"#fff"}
          >=</Button>

        </Grid>

      </Box>
      
    </AppStyled>
  );

}

export default App;