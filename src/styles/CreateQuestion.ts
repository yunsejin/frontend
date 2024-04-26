import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 90%;
  max-width: 800px;
  margin: auto;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 2px solid #dee2e6;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
  }
`;

export const Image = styled.img`
  width: 100px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
`;

export const QuestionContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 15px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

export const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  min-width: 80px;
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
`;

export const Input_text = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s ease-in-out;
  &:focus {
    border-color: #0056b3;
  }
`;