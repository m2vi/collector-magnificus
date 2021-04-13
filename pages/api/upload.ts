import { NextApiRequest, NextApiResponse } from "next";
import calcPrivacyPoints from "../../utils/calcPrivacyPoints";
import dbConnect from "../../utils/db/dbConnect";
import dbSchema from "../../models/dbSchema";
import mongoose, { Schema } from "mongoose";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dataToUpload = {
    success: true,
    data: req.body,
    privacyPoints: calcPrivacyPoints(req.body),
  };

  try {
    res.status(200).json(dataToUpload);

    const item = new dbSchema(dataToUpload);

    item.save();
  } catch (err) {
    res.status(400).json({ success: false, message: "Mission failed" });
  }
};
