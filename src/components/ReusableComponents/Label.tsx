import styled from "@emotion/styled";
import React from "react";

type LabelProps = {
  children: React.ReactNode;
};
const LabelStyles = styled.label`
  font-weight: 500;
  display: block;
  margin: 5px 0px;
`;
function Label({ children }: LabelProps) {
  return <LabelStyles>{children}</LabelStyles>;
}

export default Label;
