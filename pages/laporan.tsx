/* eslint-disable react-hooks/exhaustive-deps */
import { Line, Bar } from "react-chartjs-2";
import ChartCard from "components/Chart/ChartCard";
import InfoCard from "components/Cards/InfoCard";
import RoundIcon from "components/RoundIcon";
import ChartLegend from "components/Chart/ChartLegend";
import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import { lineLegends, barLegends } from "utils/demo/chartsData";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "icons";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Select } from "@roketid/windmill-react-ui";

interface ILaporan {
  jumlah_pesanan: number;
  total_pendapatan: number;
}

function Charts() {
  Chart.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const resultsPerPage = 10;

  const [page, setPage] = useState(1);
  const [laporan, setLaporan] = useState<ILaporan>({
    jumlah_pesanan: 0,
    total_pendapatan: 0,
  });
  const [tempData, setTempData] = useState<[]>([]);
  const [data, setData] = useState<[]>([]);
  const [totalMonths, setTotalMonths] = useState<any>({
    total: 0,
    july: 0,
    august: 0,
  });
  const [totalLayanan, setTotalLayanan] = useState([
    {
      Regular: 0,
      Express: 0,
    },
    {
      Regular: 0,
      Express: 0,
    },
  ]);

  const [month, setMonth] = useState<string>("");

  const getData = async () => {
    const response = await axios.get("/api/pesanan");
    const laporan = await axios.get("/api/laporan?laporan");
    setData(response.data);
    setTempData(response.data);
    console.log(response.data[0].tanggal.split("-")[1]);
    if (!laporan.data) return;

    setLaporan(laporan.data);
    const july = response.data.filter(
      (item: any) => item.tanggal.split("-")[1] === "07"
    );

    const totalJuly = july.length;

    setTotalMonths({
      total: response.data.length,
      july: totalJuly,
      august: response.data.length - totalJuly,
    });
    setTotalLayanan([
      {
        Regular: july.filter((item: any) => item.layanan === "regular").length,
        Express: july.filter((item: any) => item.layanan === "express").length,
      },
      {
        Regular: response.data.filter((item: any) => item.layanan === "regular")
          .length,
        Express: response.data.filter((item: any) => item.layanan === "express")
          .length,
      },
    ]);
  };

  const lineOptions = {
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
      ],
      datasets: [
        {
          label: "Pesanan",
          backgroundColor: "#0694a2",
          borderColor: "#0694a2",
          data: [0, 0, 0, 0, 0, 0, totalMonths.july, totalMonths.august],
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

  const barOptions = {
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
      ],
      datasets: [
        {
          label: "Regular",
          backgroundColor: "#0694a2",
          borderWidth: 1,
          data: [
            0,
            0,
            0,
            0,
            0,
            0,
            totalLayanan[0].Regular,
            totalLayanan[1].Regular - totalLayanan[0].Regular,
          ],
        },
        {
          label: "Express",
          backgroundColor: "#7e3af2",
          borderWidth: 1,
          data: [
            0,
            0,
            0,
            0,
            0,
            0,
            totalLayanan[0].Express,
            totalLayanan[1].Express - totalLayanan[0].Express,
          ],
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

  const getFilter = async () => {
    const response = await axios.get(`/api/laporan?bulan=${month}`);
    setLaporan(response.data);

    let data = tempData as any;

    if (month !== "") {
      data = tempData.filter(
        (item: any) => item.tanggal.split("-")[1] === month
      );
    }
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getFilter();
  }, [month]);
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <PageTitle>Laporan Penjualan</PageTitle>
        <div className="flex space-x-4">
          <Select className="mt-1" onChange={(e) => setMonth(e.target.value)}>
            <option selected value={""}>
              Semua Bulan
            </option>
            <option value={"07"}>July</option>
            <option value={"08"}>Agustus</option>
          </Select>
          <Select className="mt-1 w-28">
            <option>2023</option>
          </Select>
        </div>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Total Pesanan"
          value={laporan.jumlah_pesanan.toString()}
        >
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Total Pesanan Selesai"
          value={data
            .filter((item: any) => item.status === "Selesai")
            .length.toString()}
        >
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Total Berat Pakaian"
          value={`${data.reduce(
            (a: any, b: any) => a + b.jumlah_pakaian,
            0
          )} Kg`}
        >
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Total Pendapatan"
          value={`Rp. ${new Intl.NumberFormat("id-ID").format(
            laporan.total_pendapatan
          )}`}
        >
          {/* @ts-ignore */}
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Pertumbuhan Pesanan Setahun">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
        <ChartCard title="Pertumbuhan Pesanan Layanan Setahun">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </Layout>
  );
}

export default Charts;
