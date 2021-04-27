import { NextApiRequest, NextApiResponse } from "next";
import calcPrivacyPoints from "../../utils/calcPrivacyPoints";
import dbConnect from "../../utils/db/dbConnect";
import dbSchema from "../../models/dbSchema";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
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
