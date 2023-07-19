import { Pesanan } from "types";
import prisma from "../../utils/prisma";
import { NextApiResponse } from "next";

export default async function handler(req: Request, res: NextApiResponse) {
  const { body } = req;
  const { id_pesanan, status_pembayaran, status } = body as unknown as Pesanan;

  const pesanan = await prisma.pesanan.findUnique({
    where: {
      id_pesanan,
    },
  });

  if (!pesanan) {
    return res.status(404).json({
      message: "Pesanan tidak ditemukan",
    });
  }

  const updatePesanan = await prisma.pesanan.update({
    where: {
      id_pesanan,
    },
    data: {
      status_pembayaran,
      status,
    },
  });

  return res.status(200).json(updatePesanan);
}
