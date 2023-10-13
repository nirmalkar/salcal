import React from "react";
import styled from "@emotion/styled";

type NumberInputProps = {
  setValue: (value: number) => void;
  value: number;
  width?: string;
};
type InputProps = {
  width?: string;
};
const Input = styled.input<InputProps>`
  width: ${(props) => props.width ?? "97.5%"};
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;

  @media (max-width: 768px) {
    width: ${(props) => props.width ?? "95%"};
  }
  @media (max-width: 576px) {
    width: ${(props) => props.width ?? "96%"};
  }
  @media (max-width: 426px) {
    width: ${(props) => props.width ?? "92%"};
  }
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const NumberInput: React.FC<NumberInputProps> = ({
  setValue,
  value,
  width,
}) => {
  return (
    <div>
      <Input
        type="number"
        value={value}
        onChange={(e: any) => setValue(Number(e.target.value))}
        width={width}
      />
    </div>
  );
};

export default NumberInput;
