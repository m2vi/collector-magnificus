import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/db/dbConnect";
import dbSchema from "../../models/dbSchema";
import mongoose, { Schema } from "mongoose";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    res.status(200).json({ success: true, data: await dbSchema.find() });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Mission failed" });
  }
};
