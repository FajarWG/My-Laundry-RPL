import { Pesanan } from "types";
import prisma from "../../utils/prisma";
import { NextApiResponse } from "next";

export default async function handler(req: Request, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const transaction = await prisma.layanan.findMany();

      return res.status(200).json(transaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  return res.status(200).json({ message: "Hello" });
}
