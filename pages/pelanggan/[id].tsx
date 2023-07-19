import React, { useState, useEffect } from "react";
import axios from "axios";

import { Badge } from "@roketid/windmill-react-ui";
import { useRouter } from "next/router";
import { Pesanan } from "types";

function CrateAccount() {
  const router = useRouter();
  const [data, setData] = useState<Pesanan>({
    id_pesanan: "",
    nama_pelanggan: "",
    jumlah_pakaian: 0,
    status: "",
    status_pembayaran: "",
    tanggal: "10/10/2021",
    layanan: "",
    total_harga: 0,
  });
  const [estimated, setEstimated] = useState<string>("");
  const { id } = router.query;

  const statusProses = (status: string) => {
    if (status === "Diproses" || status === "Belum Dibayar") {
      return "warning";
    }
    return "success";
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    const getData = async () => {
      const response = await axios.get(`/api/pesanan/${id}`);
      if (!response.data) {
        return;
      }
      const layanan = await axios.get(`/api/layanan/`);
      const layananData = layanan.data.find(
        (item: any) => item.nama_layanan === response.data.layanan
      );

      if (!layananData || !response.data) {
        return;
      }
      setEstimated(layananData.estimasi_waktu);
      setData(response.data);
    };
    getData();
  }, [id]);

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto items-center">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 border-y-8 border-y-indigo-500">
            <div className="w-full items-center justify-center">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">
                Pesanan My Laundry
              </h1>
              <table className="table-auto w-full border-0">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-gray-600"></th>
                    <th className="px-4 py-2 text-gray-600"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-200">
                  <tr>
                    <td className="px-4 py-2 border-0 ">Nama</td>
                    <td className="px-4 py-2 border-0">
                      : {data.nama_pelanggan}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-0">Berat Pakaian</td>
                    <td className="px-4 py-2 border-0">
                      : {data.jumlah_pakaian} Kg
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-0">Layanan</td>
                    <td className="px-4 py-2 border-0">: {data.layanan}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-0">Tanggal</td>
                    <td className="px-4 py-2 border-0">
                      :{" "}
                      {new Date(data.tanggal).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-0">Estimasi Selesai</td>
                    <td className="px-4 py-2 border-0">: {estimated} Hari</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-0">Status</td>
                    <td className="px-4 py-2 border-0">
                      :{" "}
                      <Badge type={statusProses(data?.status)}>
                        {data.status}
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-0 font-bold">
                      Total Harga
                    </td>
                    <td className="px-4 py-2 border-0 font-bold">
                      : Rp. 20.000
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className="my-8" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CrateAccount;
