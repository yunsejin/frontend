import styled from 'styled-components';

// 스타일드 컴포넌트 정의
export const CardContainer = styled.div`
  max-width: 20rem;
  background-color: rgba(255, 255, 255, 0.5); /* 배경색을 투명하게 설정합니다. */
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
  margin: 10px;
  transition: transform 0.3s ease-in-out; /* 부드러운 전환 효과 */
  overflow: hidden;
  cursor: pointer;
  padding: 10px;
  &:hover {
    transform: scale(1.05); /* 마우스 오버 시 5% 확대 */
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }

  .cardImg{
    object-fit: cover;
    /* border: 1px solid red; */
  }
  

`;


export const CardContent = styled.div`
  /* padding: 1.25rem; */
`;

export const CardTitle = styled.h5`
  margin-bottom: 0.5rem;
  margin-top: 0rem;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.5;
  color: #374151;
`;

export const CardDescription = styled.p`
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #6b7280;
`;

export const ReadMoreLink = styled.a`
  /* display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  background-color: #3b82f6;
  border-radius: 0.375rem; */
  

  &:hover {
    background-color: #2563eb;
  }
`;