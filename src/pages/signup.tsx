// src/pages/Signup.tsx
import React, { useState } from 'react';
import { Container, Button, Title, SmallButton, NameContainer, Div } from '../styles/SignupStyles';
import NavBar from '../components/public/navbar_main';
import { useNavigate } from 'react-router-dom';
import NicknameGenerator from '../components/signup/nickname_generator';
import { handleButtonClick, handleSubmit } from '../components/signup/signup_handlers';

function Signup() {
  const [nickname, setNickname] = useState('');
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const navigate = useNavigate();

  interface UserToken {
    credential: string;
  }

  const userTokenString: string | null = localStorage.getItem('token');
  let credential: string;
  if (userTokenString) {
    const userToken: UserToken = JSON.parse(userTokenString);
    credential = userToken.credential;
  }else{return null;}

  return (
    <Container>
      <NavBar />
      <Div>
        <Title>Sign Up</Title>
        <SmallButton selected={selectedButton === 0} onClick={() => handleButtonClick({ buttonIndex: 0, selectedButton, setSelectedButton })}>선생님</SmallButton>
        <SmallButton selected={selectedButton === 1} onClick={() => handleButtonClick({ buttonIndex: 1, selectedButton, setSelectedButton })}>학생</SmallButton>
        <NameContainer>
          <NicknameGenerator onNicknameGenerated={setNickname} />
        </NameContainer>
        <form onSubmit={(event) => handleSubmit({ event, credential, nickname, selectedButton, navigate })}>
          <Button type="submit">Join</Button>
        </form>
      </Div>
    </Container>
  );
}

export default Signup;
