import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import dbSchema from "../../models/dbSchema";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({ body: { success: true, message: req.query } });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};
