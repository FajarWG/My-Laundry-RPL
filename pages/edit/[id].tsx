/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Input, Label, Select, Button } from "@roketid/windmill-react-ui";
import PageTitle from "components/Typography/PageTitle";

import Layout from "containers/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Pesanan } from "types";

function Forms() {
  const router = useRouter();
  const { id } = router.query;

  const [datas, setDatas] = useState<Pesanan>({
    nama_pelanggan: "",
    jumlah_pakaian: 0,
    status: "",
    tanggal: "",
    status_pembayaran: "",
    total_harga: 0,
    layanan: "",
  });
  const [status, setStatus] = useState("Diproses");
  const [payment, setPayment] = useState("Belum Dibayar");

  const handleSubmit = async () => {
    const data = {
      id_pesanan: id,
      status: status,
      status_pembayaran: payment,
    };

    const response = await axios.post("/api/editPesanan", data);

    if (response.status === 200) {
      toast.success("Pesanan berhasil diubah");
      router.push("/pesanan");
    } else {
      toast.error("Pesanan gagal diubah");
      router.push("/pesanan");
    }
  };

  const getData = async () => {
    const response = await axios.get(`/api/pesanan`);
    const data = response.data.filter((item: any) => item.id_pesanan === id);
    setDatas(data[0]);
    setStatus(data[0].status);
    setPayment(data[0].status_pembayaran);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <PageTitle>Edit Pesanan</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Nama</span>

          <Input className="mt-1" disabled value={datas.nama_pelanggan} />
        </Label>

        <Label>
          <span>Jumlah Pesanan(Kg)</span>
          <Input
            className="mt-1"
            disabled
            type="number"
            value={datas.jumlah_pakaian}
          />
        </Label>

        <div className="mt-4">
          {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
          <Label>Daftar Layanan</Label>
          <div className="mt-2">
            <Label radio>
              <Input
                type="radio"
                value="personal"
                name="accountType"
                disabled
              />
              <span className="ml-2">Regular</span>
            </Label>
            <Label className="ml-6" radio>
              <Input
                type="radio"
                value="business"
                name="accountType"
                disabled
              />
              <span className="ml-2">Express</span>
            </Label>
          </div>
          <Label className="mt-4">
            <span>Status</span>
            <Select
              className="mt-1"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option selected={datas.status === "Diproses" ? true : false}>
                Diproses
              </option>
              <option selected={datas.status === "Selesai" ? true : false}>
                Selesai
              </option>
            </Select>
          </Label>
          <Label className="mt-4">
            <span>Pembayaran</span>
            <Select
              className="mt-1"
              onChange={(e) => setPayment(e.target.value)}
            >
              <option
                selected={
                  datas.status_pembayaran === "Belum Dibayar" ? true : false
                }
              >
                Belum Dibayar
              </option>
              <option
                selected={
                  datas.status_pembayaran === "Sudah Dibayar" ? true : false
                }
              >
                Sudah Dibayar
              </option>
            </Select>
          </Label>
        </div>
        <Button onClick={handleSubmit} className="mt-4">
          Edit
        </Button>
      </div>
    </Layout>
  );
}

export default Forms;
