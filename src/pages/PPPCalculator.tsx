import React, { useEffect, useState } from "react";
import CountrySelect from "../components/CountrySelect";
import { countries } from "../constants/countries";
import { usePPP } from "../context/PPPContext";

interface SourveAndTargetCountryObj {
  sourceCountriesObj: any;
  targetCountriesObj: any;
}

const PPPCalculator: React.FC = () => {
  const [sourceCountry, setSourceCountry] = useState<string>("");
  const [salary, setSalary] = useState<number>(100);
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
    <div>
      <CountrySelect
        label="Source Country"
        countries={countries}
        selectedCountry={sourceCountry}
        onChange={setSourceCountry}
      />
      <label>
        Salary in {sourceCountry}'s Local Currency{" "}
        {sourceAndTargetCountryObj["sourceCountriesObj"][0]?.currencySymbol}
      </label>
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
      />
      <CountrySelect
        label="Target Country"
        countries={countries}
        selectedCountry={targetCountry}
        onChange={setTargetCountry}
      />
      <button onClick={calculatePPP}>Calculate</button>
      <div>
        <strong>
          You need to earn:{" "}
          {sourceAndTargetCountryObj["targetCountriesObj"][0]?.currencySymbol}
        </strong>{" "}
        {output.toFixed(2)} to live same kinda life in{" "}
        <strong>
          {sourceAndTargetCountryObj["targetCountriesObj"][0]?.name}
        </strong>
      </div>
    </div>
  );
};

export default PPPCalculator;
