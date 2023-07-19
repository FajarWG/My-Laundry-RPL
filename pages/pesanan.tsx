/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import PageTitle from "components/Typography/PageTitle";
import Layout from "containers/Layout";
import response, { ITableData } from "utils/demo/tableData";
import { EditIcon, PagesIcon } from "icons";

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
  Button,
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
import axios from "axios";
import Link from "next/link";

interface IProps {
  id_pesanan: any;
  nama_pelanggan: string;
  jumlah_pakaian: number;
  status: string;
  status_pembayaran: string;
  tanggal: string;
  total_harga: number;
  layanan: string;
}

function Pesanan() {
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

  const [page, setPage] = useState(1);
  const [data, setData] = useState<[]>([]);
  const [totalData, setTotalData] = useState(0);

  const resultsPerPage = 10;

  function onPageChange(p: number) {
    setPage(p);
  }

  const statusProses = (status: string) => {
    if (status === "Diproses" || status === "Belum Dibayar") {
      return "warning";
    }
    return "success";
  };

  const getData = async (pages: number) => {
    const response = await axios.get("/api/pesanan");
    setTotalData(response.data.length);

    setData(
      response.data.slice(
        (pages - 1) * resultsPerPage + 1,
        pages * resultsPerPage
      )
    );
  };

  useEffect(() => {
    getData(page);
  }, []);

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <Layout>
      <PageTitle>Kumpulan Pesanan</PageTitle>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Pelanggan</TableCell>
              <TableCell>Total Berat</TableCell>
              <TableCell>Layanan</TableCell>
              <TableCell>Total Harga</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Status Pembayaran</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Bagikan</TableCell>
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
                  <span className="text-sm">{user.layanan}</span>
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
                <TableCell>
                  <Link href={`/edit/${user.id_pesanan}`}>
                    <Button layout="link" aria-label="Edit">
                      <EditIcon className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <a
                    // href={`https://api.whatsapp.com/send?phone=+6285155229511&text=Cek%20pesanan%20laundry%20kamu%20disini%20:%20http://localhost:3000/pelanggan/${user.id_pesanan}`}
                    href={`/pelanggan/${user.id_pesanan}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button layout="link" aria-label="Edit">
                      <PagesIcon className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalData}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}

export default Pesanan;
