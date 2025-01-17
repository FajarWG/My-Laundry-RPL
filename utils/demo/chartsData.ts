export interface ILegends {
  title: string;
  color: string;
}

export const doughnutLegends: ILegends[] = [
  { title: "Shirts", color: "bg-blue-500" },
  { title: "Shoes", color: "bg-teal-600" },
  { title: "Bags", color: "bg-purple-600" },
];

export const lineLegends: ILegends[] = [
  { title: "Pesanan", color: "bg-teal-600" },
  // { title: "Paid", color: "bg-purple-600" },
];

export const barLegends: ILegends[] = [
  { title: "Regular", color: "bg-teal-600" },
  { title: "Express", color: "bg-purple-600" },
];

export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [33, 33, 33],
        backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
        label: "Dataset 1",
      },
    ],
    labels: ["Shoes", "Shirts", "Bags"],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
};

export const lineOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Pesanan",
        backgroundColor: "#0694a2",
        borderColor: "#0694a2",
        data: [43, 48, 40, 54, 67, 73, 70],
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
  legend: {
    display: false,
  },
};

export const barOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Regular",
        backgroundColor: "#0694a2",
        borderWidth: 1,
        data: [2, 14, 52, 74, 33, 90, 70],
      },
      {
        label: "Express",
        backgroundColor: "#7e3af2",
        borderWidth: 1,
        data: [66, 33, 43, 12, 54, 62, 84],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
};
