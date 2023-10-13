import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const NavigationContainer = styled.div`
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

function Navigation() {
  return (
    <NavigationContainer>
      <StyledLink to="/">PPP Calculator</StyledLink>
      <StyledLink to="/salary-breakdown">SalaryExpense</StyledLink>
    </NavigationContainer>
  );
}

export default Navigation;
