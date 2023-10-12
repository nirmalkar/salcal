import React from "react";
import { CountryType } from "../constants/countries";

interface CountrySelectProps {
  label: string;
  countries: CountryType[];
  selectedCountry: string;
  onChange: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  label,
  countries,
  selectedCountry,
  onChange,
}) => {
  return (
    <div>
      <label>{label}</label>
      <select
        value={selectedCountry}
        onChange={(e) => onChange(e.target.value)}
      >
        {countries.map((country) => (
          <option key={country.name} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
