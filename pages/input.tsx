import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Input, Label, Select, Button } from "@roketid/windmill-react-ui";
import PageTitle from "components/Typography/PageTitle";

import Layout from "containers/Layout";
import axios from "axios";
import toast from "react-hot-toast";

function Forms() {
  const route = useRouter();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [service, setService] = useState("");
  const [payment, setPayment] = useState("Belum Dibayar");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = async () => {
    setIsLoaded(true);
    const data = {
      nama_pelanggan: name,
      jumlah_pakaian: parseInt(quantity),
      layanan: service,
      status_pembayaran: payment,
    };

    const response = await axios.post("/api/pesanan", data);

    if (response.status === 200) {
      toast.success("Pesanan berhasil ditambahkan");
      route.push("/pesanan");
    } else {
      toast.error("Pesanan gagal ditambahkan");
    }
    setIsLoaded(false);
  };

  useEffect(() => {
    if (name.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
      toast.error("Nama tidak boleh mengandung simbol");
    }
  }, [name]);

  return (
    <Layout>
      <PageTitle>Masukkan Pesanan</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Nama</span>

          <Input
            className="mt-1"
            placeholder="Jane Doe"
            onChange={(e) => setName(e.target.value)}
          />
        </Label>

        <Label>
          <span>No HP</span>

          <Input type="number" className="mt-1" placeholder="0851555" />
        </Label>

        <Label className="mt-1">
          <span>Jumlah Pesanan(Kg)</span>
          <Input
            className="mt-1"
            placeholder="5"
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Label>

        <div className="mt-4">
          <Label>Daftar Layanan</Label>
          <div className="mt-2">
            <Label radio>
              <Input
                type="radio"
                value="personal"
                name="accountType"
                onClick={() => setService("regular")}
              />
              <span className="ml-2">Regular</span>
            </Label>
            <Label className="ml-6" radio>
              <Input
                type="radio"
                value="business"
                name="accountType"
                onClick={() => setService("express")}
              />
              <span className="ml-2">Express</span>
            </Label>
          </div>
          <Label className="mt-4">
            <span>Pembayaran</span>
            <Select
              className="mt-1"
              onChange={(e) => setPayment(e.target.value)}
            >
              <option>Belum Dibayar</option>
              <option>Sudah Dibayar</option>
            </Select>
          </Label>
        </div>
        <Button onClick={handleSubmit} className="mt-4" disabled={isLoaded}>
          Pesan
        </Button>
      </div>
    </Layout>
  );
}

export default Forms;
