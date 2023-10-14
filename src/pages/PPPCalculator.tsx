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
import LineChart from "../components/ReusableComponents/Linechart";

interface SourveAndTargetCountryObj {
  sourceCountriesObj: any;
  targetCountriesObj: any;
}
const SalaryAllocationContainer = styled.div`
  width: 80%;
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
  const [sourceCountryChartData, setSourceCountryChartData] = useState<any>([]);
  const [targetCountryChartData, setTargetCountryChartData] = useState<any>([]);
  const [chartData, setChartdata] = useState<any>([]);
  const [calculated, setCalculated] = useState<boolean>(false);
  const { worldBankPPPData } = usePPP();

  const calculatePPP = () => {
    const convertedSalary = salary * conversionRate;
    setOutput(convertedSalary);
    if (sourceCountryChartData[0]?.id && targetCountryChartData[0]?.id) {
      setCalculated(true);
    }
  };
  useEffect(() => {
    setConversionRate(targetAvgPPPValue / sourceAvgPPPValue);
  }, [sourceAvgPPPValue, targetAvgPPPValue]);
  useEffect(() => {
    const sourceCountriesData = worldBankPPPData.filter(
      (data) => data.LOCATION === sourceCountry
    );
    setTargetCountry("");
    setCalculated(false);
    const sourceCountriesObj = countries.filter(
      (country) => country.code === sourceCountry
    );

    const sourceChartData = sourceCountriesData.map((ele) => ({
      x: ele.TIME,
      y: ele.Value,
    }));
    setSourceCountryChartData([
      { id: sourceCountriesObj[0]?.name, data: sourceChartData },
    ]);
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
    const targetChartData = targetCountriesData.map((ele) => ({
      x: ele.TIME,
      y: ele.Value,
    }));
    setTargetCountryChartData([
      { id: targetCountriesObj[0]?.name, data: targetChartData },
    ]);
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
    if (sourceCountry) {
      setCalculated(false);
    }
  }, [targetCountry]);
  console.log(sourceCountryChartData, targetCountryChartData);
  useEffect(() => {
    if (sourceCountryChartData[0]?.id && targetCountryChartData[0]?.id) {
      setChartdata([...sourceCountryChartData, ...targetCountryChartData]);
    }
  }, [sourceCountryChartData, targetCountryChartData]);
  return (
    <Layout>
      <>
        <Navigation />
        <SalaryAllocationContainer>
          <Card width="100%">
            <>
              <CountrySelect
                label="Source Country"
                countries={countries}
                selectedCountry={sourceCountry}
                onChange={setSourceCountry}
              />
              <Label>
                Salary in{" "}
                <strong>
                  {sourceAndTargetCountryObj["sourceCountriesObj"][0]?.name}'s{" "}
                </strong>
                Local Currency{" "}
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
              {calculated && (
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
              )}
              {calculated && (
                <LineChart
                  legendX={"PPP value"}
                  legendY={"Years"}
                  data={chartData}
                />
              )}
            </>
          </Card>
        </SalaryAllocationContainer>
      </>
    </Layout>
  );
};

export default PPPCalculator;
