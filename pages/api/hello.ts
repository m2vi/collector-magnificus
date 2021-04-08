import { NextApiRequest, NextApiResponse } from 'next';
import si from 'systeminformation';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const audio = await si.osInfo();
  res.status(200).json({
    hello: audio.distro,
  });
};
