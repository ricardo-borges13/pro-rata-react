import styled from "styled-components";

export const CenteredContainer = styled.div`
  max-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Se quiser, pode adicionar um padding */
`;

export const Wrapper = styled.div`
  background-color: rgb(236, 224, 207);
  width: 50%;
  box-shadow: 7px 7px 10px black;
  text-align: center;
  border-radius: 6px; 
  user-select: none;
`
export const fieldsetContainer = styled.div`
 justify-items: center;
 padding: 10px;
`
export const fieldset = styled.fieldset` 
  border: 2px solid #647383;
  border-radius: 10px;
  margin: 20px;
  background-color: rgb(219, 218, 217);  
  input,label{
    cursor: pointer;
  }
  legend{    
    font-weight: bold;
    font-size: 16px;
    line-height: 1;   
    position: relative;
    top: -0.2rem;
    background-color: rgb(219, 218, 217);
  }
  div{  
    display: flex;
    justify-content: space-around;    
  }

  span{
    padding: 5px;
    font-size: 18px;
  }
  `
export const divData = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`
export const divDataIF = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 17px;
  font-family: Franklin Gothic Medium ", " Arial Narrow, Arial, sans-serif; 
  font-weight: bold ;
`
export const inputDate = styled.input`
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 2px solid #647383;
  border-radius: 8px;
  background-color: rgb(217, 219, 217);
  color: black;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: black;
    box-shadow: 0 0 0 1px black;
  }
`
export const inputValor = styled.input`
font-size: 17px;
  background-color: rgb(217, 219, 217);
  cursor: pointer;
  padding: 10px;
  border: 2px solid #647383;
  border-radius: 6px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
`
export const divRadio = styled.div`
display: none;
font-size: 9px;
`

export const divValor = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 20px;
  margin-top: 25px;

  /* Remove as setas em navegadores baseados em WebKit (Chrome, Safari, Edge) */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Remove as setas no Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`

export const divButton = styled.div`
margin-top: 15px;
display: flex;
justify-content: center;
`

export const myButon = styled.button`
cursor: pointer;
  height: 50px;
  font-size: 20px;
  background-color: #00336a;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 20px;
  transition: background-color 0.3s ease;

  &:hover{
    background-color: #114174;
  }

  &:active{
    background-color: #007bff;
    transform: scale(0.98);
  }
`
export const divClean = styled.div`
margin-top: 15px;
display: flex;
justify-content: center;
`

export const buttonClean = styled.button`  
  cursor: pointer;  
  background-color: #17a2b8;
  border-radius: 8px;
  font-size: 15px;
  height: 23px;
  width: 73px;
  color: white;
  border: none;
  &:hover{
    background-color: rgb(185, 247, 247);
  }
`

export const divCopiar = styled.div`
display: flex;
justify-content: center;
margin: 10px 0 10px 0;
`
export const buttonCopiar = styled.button`
  display: none;
  background-color: #f0f0f0;
  color: #333;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 14px;
  transition: all 0.3s ease;
  &:hover{
    background-color: #e0e0e0;
  }
  &:active{
    transform: scale(0.95); /* Efeito de clique */
  }
`

export const tooltip = styled.div`
  display: none;
  position: absolute;
  top: 685px; /* sobe o tooltip */
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  max-width: 180px;
  font-size: 12px;
  z-index: 100;
  white-space: normal;
`

export const spanHelp = styled.span`
  display: none;
  background-color:rgb(156, 194, 243);
  border-radius: 50px;
  cursor: pointer;
  font-size: 22px;
  margin-left: 8px;  
 `

export const divResultado = styled.div`
  display: none;
  border: 2px solid #4caf50;
  background-color: #f0f8ff;
  padding: 5px 10px 5px 10px;
  border-radius: 8px;
  width: fit-content;
  margin: 10px auto;
`
export const resultDias = styled.small`

  color: rgb(2, 95, 22);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 1.5em;
  
  #spanDias{
    color: red;
    font-weight: bold;
  }
`

export const resultPreco = styled.small`
  color: red;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 30px;
`