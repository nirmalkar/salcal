// src/components/Card.tsx
import React from "react";
import styled from "@emotion/styled";

interface CardContainerProps {
  height?: string;
  width?: string;
}
interface CardTtileProps {}
// Define the styled components using Emotion
const CardContainer = styled.div<CardContainerProps>`
  width: ${(props) => props.width ?? "100%"};
  height: ${(props) => props.height ?? ""};
  padding: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  margin: 20px;
`;

const CardTitle = styled.div<CardTtileProps>`
  font-size: 1.2rem;
  font-weight: 600;
`;

const CardContent = styled.p`
  font-size: 1rem;
`;

// Card component
interface CardProps {
  title?: string;
  content?: string;
  children: React.ReactElement;
  height?: string;
  width?: string;
}

const Card: React.FC<CardProps> = ({ children, title, content, height }) => {
  return (
    <CardContainer height={height}>
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
      {children}
    </CardContainer>
  );
};

export default Card;
