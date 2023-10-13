/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import CountrySelect from "../components/ReusableComponents/CountrySelect";
import { countries } from "../constants/countries";
import { usePPP } from "../context/PPPContext";
import Layout from "../components/ReusableComponents/Layout";
import Navigation from "../components/ReusableComponents/Navigation";
import Card from "../components/ReusableComponents/Card";
import styled from "@emotion/styled";
import Label from "../components/ReusableComponents/Label";
import NumbnerInput from "../components/ReusableComponents/NumberInput";
import Button from "../components/ReusableComponents/Button";

interface SourveAndTargetCountryObj {
  sourceCountriesObj: any;
  targetCountriesObj: any;
}
const SalaryAllocationContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  /* Media query for screens smaller than 768px */
  @media (max-width: 768px) {
    width: 70%;
  }

  /* Media query for screens smaller than 576px */
  @media (max-width: 576px) {
    width: 100%;
  }
`;
const PPPCalculator: React.FC = () => {
  const [sourceCountry, setSourceCountry] = useState<string>("");
  const [salary, setSalary] = useState<number>(1000);
  const [sourceAndTargetCountryObj, setSourceAndTargetCountryObj] =
    useState<SourveAndTargetCountryObj>({
      sourceCountriesObj: {},
      targetCountriesObj: {},
    });
  const [targetCountry, setTargetCountry] = useState<string>("");
  const [output, setOutput] = useState<number>(0);
  const [sourceAvgPPPValue, setSourceAvgPPPValue] = useState<number>(0);
  const [targetAvgPPPValue, setTargetAvgPPPValue] = useState<number>(0);
  const [conversionRate, setConversionRate] = useState<number>(0);
  const { worldBankPPPData } = usePPP();

  const calculatePPP = () => {
    const convertedSalary = salary * conversionRate;
    setOutput(convertedSalary);
  };
  useEffect(() => {
    setConversionRate(targetAvgPPPValue / sourceAvgPPPValue);
  }, [sourceAvgPPPValue, targetAvgPPPValue]);
  useEffect(() => {
    const sourceCountriesData = worldBankPPPData.filter(
      (data) => data.LOCATION === sourceCountry
    );
    const sourceCountriesObj = countries.filter(
      (country) => country.code === sourceCountry
    );
    setSourceAndTargetCountryObj({
      ...sourceAndTargetCountryObj,
      sourceCountriesObj,
    });
    const sourceCountriesAvgPPPValue = sourceCountriesData.reduce(
      (a, c) => a + c.Value,
      0
    );
    setSourceAvgPPPValue(
      sourceCountriesAvgPPPValue / sourceCountriesData.length
    );
  }, [sourceCountry]);
  useEffect(() => {
    const targetCountriesData = worldBankPPPData.filter(
      (data) => data.LOCATION === targetCountry
    );
    const targetCountriesObj = countries.filter(
      (country) => country.code === targetCountry
    );
    setSourceAndTargetCountryObj({
      ...sourceAndTargetCountryObj,
      targetCountriesObj,
    });
    const targetCountriesAvgPPPValue = targetCountriesData.reduce(
      (a, c) => a + c.Value,
      0
    );
    setTargetAvgPPPValue(
      targetCountriesAvgPPPValue / targetCountriesData.length
    );
  }, [targetCountry]);

  return (
    <Layout>
      <>
        <Navigation />
        <SalaryAllocationContainer>
          <Card width="80%">
            <>
              <CountrySelect
                label="Source Country"
                countries={countries}
                selectedCountry={sourceCountry}
                onChange={setSourceCountry}
              />
              <Label>
                Salary in {sourceCountry}'s Local Currency{" "}
                {
                  sourceAndTargetCountryObj["sourceCountriesObj"][0]
                    ?.currencySymbol
                }
              </Label>
              <NumbnerInput
                value={salary}
                setValue={(value) => setSalary(value)}
              />
              <CountrySelect
                label="Target Country"
                countries={countries}
                selectedCountry={targetCountry}
                onChange={setTargetCountry}
              />
              <Button onClick={calculatePPP}>Calculate</Button>
              <div>
                <strong>
                  You need to earn:{" "}
                  {
                    sourceAndTargetCountryObj["targetCountriesObj"][0]
                      ?.currencySymbol
                  }
                </strong>{" "}
                {output.toFixed(2)} to live same kinda life in{" "}
                <strong>
                  {sourceAndTargetCountryObj["targetCountriesObj"][0]?.name}
                </strong>
              </div>
            </>
          </Card>
        </SalaryAllocationContainer>
      </>
    </Layout>
  );
};

export default PPPCalculator;
