import { Pesanan } from "types";
import prisma from "../../../utils/prisma";
import { NextApiResponse } from "next";

export default async function handler(req: Request, res: NextApiResponse) {
  const { url } = req;
  const id = url?.split("/")[3];

  if (req.method === "GET") {
    try {
      const transaction = await prisma.pesanan.findMany({
        orderBy: {
          id_pesanan: "desc",
        },
      });

      return res.status(200).json(transaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  const { body } = req;

  const { layanan, nama_pelanggan, jumlah_pakaian, status_pembayaran } =
    body as unknown as Pesanan;

  const hargaLayanan = await prisma.layanan.findFirst({
    where: {
      nama_layanan: layanan,
    },
  });

  if (!hargaLayanan) {
    return res.status(404).json({
      message: "Layanan tidak ditemukan",
    });
  }

  const total = hargaLayanan.harga * jumlah_pakaian;

  const data = await prisma.pesanan.create({
    data: {
      layanan,
      nama_pelanggan,
      jumlah_pakaian,
      status_pembayaran,
      total_harga: total,
    },
  });

  const laporan = await prisma.laporan.findFirst({
    where: {
      tanggal_laporan: new Date().toISOString().slice(0, 10),
    },
  });

  if (laporan) {
    await prisma.laporan.update({
      where: {
        id_laporan: laporan.id_laporan,
      },
      data: {
        total_pendapatan: laporan.total_pendapatan + total,
        jumlah_pesanan: laporan.jumlah_pesanan + 1,
      },
    });
  } else {
    await prisma.laporan.create({
      data: {
        tanggal_laporan: new Date().toISOString().slice(0, 10),
        total_pendapatan: total,
        jumlah_pesanan: 1,
      },
    });
  }

  return res.status(200).json(data);
}
