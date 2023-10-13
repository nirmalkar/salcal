import React from "react";
import { useSalary } from "../context/SalaryContext";

const SalaryInputComponent: React.FC = () => {
  const { salaryValue, setSalaryValue } = useSalary();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    setSalaryValue(inputValue);
  };

  return (
    <div>
      <label>Enter your Monthly Salary:</label>
      <input type="number" value={salaryValue} onChange={handleInputChange} />
      <div>Decimal Value: {salaryValue}</div>
    </div>
  );
};

export default SalaryInputComponent;
