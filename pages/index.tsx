/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

import CTA from "components/CTA";
import InfoCard from "components/Cards/InfoCard";
import PageTitle from "components/Typography/PageTitle";
import RoundIcon from "components/RoundIcon";
import Layout from "containers/Layout";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "icons";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge,
  Pagination,
} from "@roketid/windmill-react-ui";

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

function Dashboard() {
  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  interface IProps {
    nama_pelanggan: string;
    jumlah_pakaian: number;
    status: string;
    status_pembayaran: string;
    tanggal: string;
    total_harga: number;
  }

  interface ILaporan {
    jumlah_pesanan: number;
    total_pendapatan: number;
  }

  const [page, setPage] = useState(1);
  const [data, setData] = useState<[]>([]);
  const [laporan, setLaporan] = useState<ILaporan>({
    jumlah_pesanan: 0,
    total_pendapatan: 0,
  });

  const resultsPerPage = 5;

  function onPageChange(p: number) {
    setPage(p);
  }

  const statusProses = (status: string) => {
    if (status === "Diproses") {
      return "warning";
    }
    return "success";
  };

  const getData = async () => {
    const response = await axios.get("/api/pesanan");
    const laporan = await axios.get("/api/laporan");
    setData(
      response.data.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    );
    if (!laporan.data) {
      return;
    }

    setLaporan(laporan.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <PageTitle>Dashboard Harian</PageTitle>

      <CTA />

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
            .filter((item: IProps) => item.status === "Selesai")
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
          title="Total Pesanan Diproses"
          value={data
            .filter((item: IProps) => item.status === "Diproses")
            .length.toString()}
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

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Pelanggan</TableCell>
              <TableCell>Total Berat</TableCell>
              <TableCell>Total Harga</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Status Pembayaran</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user: IProps, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.nama_pelanggan}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.jumlah_pakaian} Kg</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">Rp. {user.total_harga}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.tanggal).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge type={statusProses(user?.status)}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge type={statusProses(user.status_pembayaran)}>
                    {user.status_pembayaran}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={data.length}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}

export default Dashboard;
