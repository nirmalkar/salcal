import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import { rules, rulesWithDetails, Rule } from "../constants/rulesConstants";
import SalaryInputComponent from "../components/SalaryInput";
import { useSalary } from "../context/SalaryContext";
import { ToastContainer, toast } from "react-toastify";

type Props = {};

const Home = (props: Props) => {
  const initialUpdatedRule = [{ id: "", label: "", value: 0, color: "" }];
  const { currentRule, setCurrentRule, salaryValue, worldBankPPPData } =
    useSalary();
  const [updatedRule, setUpdatedRule] = useState<Rule[]>(initialUpdatedRule);
  const notify = () => toast("Wow so easy!");
  useEffect(() => {
    if (!currentRule && !salaryValue) {
      return;
    }
    const updatedRule = rulesWithDetails[currentRule].map((ele) => {
      return { ...ele, value: (ele.value / 100) * salaryValue };
    });
    console.log(updatedRule, "updatedRule");
    setUpdatedRule(updatedRule);
  }, [currentRule]);
  const setCurrentRuleHandler = (rule: string) => {
    if (salaryValue) {
      setCurrentRule(rule);
    } else {
      toast.info("Please enter salary!!");
    }
  };
  const a = worldBankPPPData.map((ele) => ele.LOCATION);
  console.log(a.filter((item, index) => a.indexOf(item) === index));
  return (
    <div>
      <SalaryInputComponent />
      {rules.map((rule) => (
        <button onClick={() => setCurrentRuleHandler(rule)} key={rule}>
          {rule}
        </button>
      ))}
      {currentRule && salaryValue && <PieChart data={updatedRule} />}
      <ToastContainer />
    </div>
  );
};

export default Home;
