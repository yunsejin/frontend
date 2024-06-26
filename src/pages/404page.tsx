import React from "react";
import styled from "styled-components";
import BackgroundAnimation from "../components/public/BackgroundAnimation";
import NaviSection from "../components/public/NaviSection";

interface NotFoundPageProps {
  isLoggedIn: boolean;
}

const Main: React.FC<NotFoundPageProps> = ( { isLoggedIn } ) => {
  const currentMenuName = '404 Not Found';

  return (
    <BackgroundAnimation>
      <NaviSection currentMenuName={currentMenuName} isLoggedIn={isLoggedIn}/>
      <NotFoundContainer>
      <StyledImage
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QA9RXhpZgAASUkqAAgAAAACAA4BAgAPAAAAJgAAABIBAwABAAAAAQAAAAAAAABJbiB0aGUgV2VzdCBJY2X/7QBeUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAEEcAlAAC1N1bnZpbmNpYmxlHAJ4AA9JbiB0aGUgV2VzdCBJY2UcAm4AGEdldHR5IEltYWdlcy9pU3RvY2twaG90bwD/4QUTaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj4KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iICAgeG1sbnM6R2V0dHlJbWFnZXNHSUZUPSJodHRwOi8veG1wLmdldHR5aW1hZ2VzLmNvbS9naWZ0LzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHBob3Rvc2hvcDpDcmVkaXQ9IkdldHR5IEltYWdlcy9pU3RvY2twaG90byIgR2V0dHlJbWFnZXNHSUZUOkFzc2V0SUQ9IjY0MTQ3MjY5NiIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6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"
          alt="Cute Not Found"
        />
        <TextContainer>
          <Title>404 Not Found</Title>
          <Description>Oops! The page you are looking for does not exist.</Description>
        </TextContainer>
        
      </NotFoundContainer>
    </BackgroundAnimation>
  );
};

export default Main;

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const TextContainer = styled.div`
  text-align: right;
  margin-left: 3rem;
`;

const StyledImage = styled.img`
  width: 230px;
  height: auto;
`;

const Title = styled.h1`
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
`;
