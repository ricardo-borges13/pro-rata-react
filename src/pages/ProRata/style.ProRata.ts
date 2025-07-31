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
display: block;
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
export const buttonClean = styled.button`
 cursor: pointer;
  display: block;
  background-color: #17a2b8;
  border-radius: 8px;
  font-size: 15px;
  height: 23px;

  &:hover{
    background-color: rgb(185, 247, 247);
  }
`
export const divClean = styled.div`
display: block;
&:show{
  display: block;
  margin: 10px 0 20px 0;
}
`
export const divCopiar = styled.div`
display: flex;
justify-content: center;
margin: 10px 0 10px 0;
`
export const buttonCopiar = styled.button`
  display: block;
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