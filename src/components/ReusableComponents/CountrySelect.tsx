import React from "react";
import styled from "@emotion/styled";
import { CountryType } from "../../constants/countries";
import Label from "./Label";

interface CountrySelectProps {
  label: string;
  countries: CountryType[];
  selectedCountry: string;
  onChange: (value: string) => void;
  width?: string;
}
type StyledSelectProps = {
  width?: string;
};

const StyledSelect = styled.select<StyledSelectProps>`
  width: ${(props) => props.width ?? "100%"};
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
`;

const CountrySelect: React.FC<CountrySelectProps> = ({
  label,
  countries,
  selectedCountry,
  onChange,
  width,
}) => {
  return (
    <div>
      <Label>{label}</Label>

      <StyledSelect
        width={width}
        value={selectedCountry}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option> {/* Default option */}
        {countries.map((country) => (
          <option key={country.name} value={country.code}>
            {country.name}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
};

export default CountrySelect;
