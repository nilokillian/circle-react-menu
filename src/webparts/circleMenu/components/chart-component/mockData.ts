interface IStatisticData {
  title: string;
  value: string | number;
}
interface IChartData {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }
  ];
}

export interface IReportData {
  [key: string]: {
    statisticData: IStatisticData[];
    chartData: IChartData;
  };
}

const data: IReportData = {
  technology: {
    statisticData: [
      { title: "ACTIVE REQUESTS", value: "562" },
      { title: "RESOLVED", value: "182" },
      { title: "ON HOLD", value: "20" },
      { title: "TOTAL REQUESTS", value: "3098" },
    ],
    chartData: {
      labels: ["Active requests", "Resolved", "On hold", "Total"],
      datasets: [
        {
          data: [562, 182, 20, 60],
          label: "IT requests",
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    },
  },

  property: {
    statisticData: [
      { title: "New lease", value: "20" },
      { title: "Vacate premese", value: "70" },
      { title: "Extend premese", value: "100" },
      { title: "Sub Lease", value: "40" },
    ],
    chartData: {
      labels: ["New", "Vacate", "Extend", "Sub Lease"],
      datasets: [
        {
          data: [20, 70, 100, 40],
          label: "Property actions",
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    },
  },
};

export default data;
