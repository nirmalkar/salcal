import { ResponsiveLine } from "@nivo/line";
type ChartData = {
  id: string;
  data: {
    x: number; // Year
    y: number; // PPP Value
  }[];
}[];
interface LineChartProps {
  data: ChartData;
  legendX: string;
  legendY: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, legendX, legendY }) => {
  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `${legendY ?? "Y"}`,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `${legendX ?? "X"}`,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[]}
      />
    </div>
  );
};

export default LineChart;
