import { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import { rules, rulesWithDetails, Rule } from "../constants/rulesConstants";
import SalaryInputComponent from "../components/SalaryInput";
import { useSalary } from "../context/SalaryContext";
import { ToastContainer, toast } from "react-toastify";
import Card from "../components/ReusableComponents/Card";
import styled from "@emotion/styled";
import Layout from "../components/ReusableComponents/Layout";
import Navigation from "../components/ReusableComponents/Navigation";

type Props = {};

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

const SalaryAllocation = (props: Props) => {
  const initialUpdatedRule = [{ id: "", label: "", value: 0, color: "" }];
  const { currentRule, setCurrentRule, salaryValue } = useSalary();
  const [updatedRule, setUpdatedRule] = useState<Rule[]>(initialUpdatedRule);

  useEffect(() => {
    if (!currentRule && !salaryValue) {
      return;
    }
    const updatedRule = rulesWithDetails[currentRule].map((ele) => {
      return { ...ele, value: (ele.value / 100) * salaryValue };
    });

    setUpdatedRule(updatedRule);
  }, [salaryValue, currentRule]);
  const setCurrentRuleHandler = (rule: string) => {
    if (salaryValue) {
      setCurrentRule(rule);
    } else {
      toast.info("Please enter salary!!");
    }
  };
  return (
    <Layout>
      <>
        <Navigation />
        <SalaryAllocationContainer>
          <Card title="Monthly salary allocartion">
            <>
              <SalaryInputComponent />
              {rules.map((rule) => (
                <button onClick={() => setCurrentRuleHandler(rule)} key={rule}>
                  {rule}
                </button>
              ))}
              {currentRule && salaryValue && <PieChart data={updatedRule} />}
            </>
          </Card>
          <ToastContainer />
        </SalaryAllocationContainer>
      </>
    </Layout>
  );
};

export default SalaryAllocation;
