import React from "react";
import { ResponsivePie } from "@nivo/pie";

interface chartData {
  id: string;
  label: string;
  value: number;
  color: string;
}
interface PieChartProps {
  data: chartData[]; // Adjust the type of data based on your data structure
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartMargin = { top: 40, right: 40, bottom: 40, left: 40 }; // Customize padding values here

  return (
    <div style={{ height: "300px" }}>
      <ResponsivePie
        data={data}
        margin={chartMargin} // Apply the margin property with padding values
        // Specify other properties and configurations for your pie chart as needed
      />
    </div>
  );
};

export default PieChart;
