interface ITableData {
  name: string;
  amount: number;
  weight: number;
  status: "Selesai" | "Diproses" | undefined;
  date: string;
}

const tableData: ITableData[] = [
  {
    name: "Fajar Wahyu",
    amount: 47100,
    status: "Selesai",
    weight: 5,
    date: "Fri Nov 29 2019 10:43:17 GMT-0300 (Brasilia Standard Time)",
  },
  {
    name: "Nurul Dini",
    amount: 93400,
    status: "Selesai",
    weight: 5,
    date: "Fri Apr 03 2020 03:07:53 GMT-0300 (Brasilia Standard Time)",
  },
  {
    name: "Reza Pahlevi",
    amount: 35100,
    status: "Diproses",
    weight: 5,
    date: "Fri Jun 21 2019 20:21:55 GMT-0300 (Brasilia Standard Time)",
  },
  {
    name: "Rizky Ramadhan",
    amount: 35500,
    status: "Diproses",
    weight: 5,
    date: "Wed Aug 28 2019 15:31:43 GMT-0300 (Brasilia Standard Time)",
  },
  {
    name: "Hanifan",
    amount: 52500,
    status: "Selesai",
    weight: 5,
    date: "Thu Jan 16 2020 09:53:33 GMT-0300 (Brasilia Standard Time)",
  },
];

export default tableData;
export type { ITableData };
