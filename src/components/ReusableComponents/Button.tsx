import React from "react";
import styled from "@emotion/styled";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  width: 100%;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin: 16px 0px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
