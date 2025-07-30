import styled from "styled-components";

export const Wrapper = styled.div`
 max-height: calc(100vh - 20px); /* altura total menos a altura do footer */
  overflow-y: auto;
  background-color: rgb(236, 224, 207);
  width: 100%;
  box-shadow: 7px 7px 10px black;
  text-align: center;
  border-radius: 6px;
  user-select: none;
`

export const Main = styled.main`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
`