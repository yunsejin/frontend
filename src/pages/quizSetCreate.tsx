import React from "react";
import ProblemPage from "../components/quizSetCreate/create_question";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../components/public/BackgroundAnimation";
import styled from "styled-components";
import ToastModal from "../components/public/toastModal";
import Container from "../styles/publicStyleComponents/Container";
import NaviSection from "../styles/publicStyleComponents/NaviSection";
import Side from "../styles/publicStyleComponents/Side";

const Create: React.FC = () => {
    const navigate = useNavigate();
    const currentMenuName = '문제집 만들기'

    return (
    <BackgroundAnimation>
      <Container>
          <NaviSection currentMenuName = {currentMenuName}></NaviSection>
              <InnerContentSection>
                <Side>
                    <ToastModal/>
                </Side>
                <Main>
                <ProblemPage navigate={navigate}/> 
                </Main>
              </InnerContentSection>
        </Container>
     </BackgroundAnimation>
    );
};

export default Create;

const InnerContentSection = styled.div`
    display: flex;
    height: 85%;
`

const Main = styled.div`
  width: 70%;
  overflow-y: auto;
  flex-wrap: wrap;
  display: flex;
  height: 85vh;
  justify-content: center;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; 
  scrollbar-width: none; 
`;