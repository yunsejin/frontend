import React, { useState } from 'react';
import { Formdiv, Input, InputContainer, StyledText } from '../../styles/CreateQuestion';
import { NameGeneratorButton } from '../../styles/SignupStyles';
import VideoThumbnail from '../public/url_to_image';
import QuestionComponent from './create_question_component';


const ProblemPage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [questionComponents, setQuestionComponents] = useState<{ id: number, expanded: boolean}[]>([]);
  const [answers, setAnswers] = useState<{ text: string, selected: boolean }[][]>([]);
  const [questionTimes, setQuestionTimes] = useState<string[]>([]);

  const addQuestionComponent = () => {
    setQuestionComponents([...questionComponents, { id: questionComponents.length, expanded: false }]);
    setAnswers([...answers, Array(6).fill({ text: '', selected: false })]);
    setQuestionTimes([...questionTimes, '']); // 시간 초기화 추가
  };

  const updateQuestionTime = (index: number, timeExchange: string) => {
    const updatedTimes = [...questionTimes];
    updatedTimes[index] = timeExchange;
    setQuestionTimes(updatedTimes);
  };

  const updateAnswers = (index: number, newAnswers: { text: string, selected: boolean }[]) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = newAnswers;
    setAnswers(updatedAnswers);
  };

  const toggleExpand = (id: number) => {
    const newComponents = questionComponents.map(component => ({
      ...component,
      id: component.id,
      expanded: component.id === id ? !component.expanded : component.expanded
    }));
    setQuestionComponents(newComponents);
  };

  const deleteQuestion = (id: number) => {
    const filteredComponents = questionComponents.filter(component => component.id !== id);
    const filteredAnswers = answers.filter((_, index) => index !== id);
    setQuestionComponents(filteredComponents);
    setAnswers(filteredAnswers);
  };

  const postData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(answers);
      console.log(questionTimes)
      const response = await fetch('http://192.168.0.143:3000/api/member/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          videoUrl: videoUrl,
          answers: answers,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Server Response:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Formdiv>
        <StyledText>나만의 문제 만들기</StyledText>
        <InputContainer>
          <Input type="text" placeholder="강의 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input type="text" placeholder="동영상 URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          <VideoThumbnail imageUrl={videoUrl}/> 
        </InputContainer>
        {questionComponents.map((component, index) => (
          <div key={component.id}>
            <QuestionComponent
              id={component.id}
              expand={component.expanded}
              onToggle={toggleExpand}
              onDelete={deleteQuestion}
              answers={answers[index]}
              updateAnswer={(newAnswers) => updateAnswers(index, newAnswers)}
              updateTime={(index,timeExchange) => updateQuestionTime(index, timeExchange)}
            />
          </div>
        ))}
        <NameGeneratorButton type="button" onClick={addQuestionComponent}>문제 추가</NameGeneratorButton>
        <form onSubmit={postData}>
          <NameGeneratorButton type="submit">제출하기 버튼</NameGeneratorButton>
        </form>
      </Formdiv>
    </>
  );
};

export default ProblemPage;
