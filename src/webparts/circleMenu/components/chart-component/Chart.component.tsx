import * as React from "react";
import {
  ChartControl,
  ChartType,
} from "@pnp/spfx-controls-react/lib/ChartControl";
import data from "./mockData";

export interface IChartComponentProps {
  dataId: string;
}

export const ChartComponent: React.FC<IChartComponentProps> = ({ dataId }) => {
  // set the options
  const options: Chart.ChartOptions = {
    legend: {
      display: true,
      position: "left",
      labels: { fontSize: 10, boxWidth: 10 },
    },
    title: {
      fontSize: 10,
      display: true,
      position: "left",
      //   text: "Property actions",
    },
    responsive: true,
  };

  return (
    <>
      {dataId && (
        <ChartControl
          type={ChartType.Pie}
          data={data[dataId].chartData}
          options={options}
        />
      )}
    </>
  );
};
