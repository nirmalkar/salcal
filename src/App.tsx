import { SalaryProvider } from "./context/SalaryContext";
import { PPPProvider } from "./context/PPPContext";
import SalaryAllocation from "./pages/SalaryAllocation";
import PPPCalculator from "./pages/PPPCalculator";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <SalaryProvider>
      <PPPProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PPPCalculator />} />
            <Route path="/salary-breakdown" element={<SalaryAllocation />} />
          </Routes>
        </BrowserRouter>
      </PPPProvider>
    </SalaryProvider>
  );
}

export default App;
