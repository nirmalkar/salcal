import React, { createContext, useContext, ReactNode } from "react";
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

interface PPPContextProps {
  worldBankPPPData: PppData[];
}

const PPPContext = createContext<PPPContextProps | undefined>(undefined);

export const PPPProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <PPPContext.Provider
      value={{
        worldBankPPPData,
      }}
    >
      {children}
    </PPPContext.Provider>
  );
};

export const usePPP = () => {
  const context = useContext(PPPContext);
  if (!context) {
    throw new Error("usePPP must be used within a PPPProvider");
  }
  return context;
};
