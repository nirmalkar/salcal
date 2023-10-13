import React, { createContext, useContext, useState, ReactNode } from "react";
import worldBankPPPData from "../constants/wbppp.json";

type PppData = {
  LOCATION: string;
  INDICATOR: string;
  SUBJECT: string;
  MEASURE: string;
  FREQUENCY: string;
  TIME: number;
  Value: number;
  FlagCodes: string;
};

interface SalaryContextProps {
  salaryValue: number;
  currentRule: string;
  setCurrentRule: React.Dispatch<React.SetStateAction<string>>;
  setSalaryValue: React.Dispatch<React.SetStateAction<number>>;
  worldBankPPPData: PppData[];
}

const SalaryContext = createContext<SalaryContextProps | undefined>(undefined);

export const SalaryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [salaryValue, setSalaryValue] = useState<number>(0);
  const [currentRule, setCurrentRule] = useState<string>("");

  return (
    <SalaryContext.Provider
      value={{
        salaryValue,
        setSalaryValue,
        currentRule,
        setCurrentRule,
        worldBankPPPData,
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = () => {
  const context = useContext(SalaryContext);
  if (!context) {
    throw new Error("useSalary must be used within a SalaryProvider");
  }
  return context;
};
