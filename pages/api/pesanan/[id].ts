import { Pesanan } from "types";
import prisma from "../../../utils/prisma";
import { NextApiResponse } from "next";

export default async function handler(req: Request, res: NextApiResponse) {
  const { url } = req;
  console.log(url);
  const id = url?.split("/")[3];
  console.log(id);

  if (req.method === "GET") {
    try {
      const transaction = await prisma.pesanan.findFirst({
        where: {
          id_pesanan: id,
        },
      });

      return res.status(200).json(transaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
