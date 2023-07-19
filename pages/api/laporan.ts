import { Pesanan } from "types";
import prisma from "../../utils/prisma";
import { NextApiResponse } from "next";

export default async function handler(req: Request, res: NextApiResponse) {
  const { url } = req;
  const filter = url?.split("?")[1];

  if (req.method === "GET") {
    try {
      if (filter === "laporan") {
        const laporan = await prisma.laporan.findMany();

        const total = {
          total_pendapatan: 0,
          jumlah_pesanan: 0,
        };

        laporan.map((laporan) => {
          total.total_pendapatan += laporan.total_pendapatan;
          total.jumlah_pesanan += laporan.jumlah_pesanan;
        });

        return res.status(200).json(total);
      }

      const laporan = await prisma.laporan.findFirst({
        where: {
          tanggal_laporan: new Date().toISOString().slice(0, 10),
        },
      });

      return res.status(200).json(laporan);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  return res.status(200).json({ message: "Hello" });
}
