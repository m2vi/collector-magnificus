import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const geodata = await fetch(
    `http://ip-api.com/json/${req.body.ip}fields=status,message,continent,country,regionName,city,district,zip,lat,lon,timezone,isp,org,as,asname,mobile,proxy,hosting,query`,
    {
      method: "GET",
      headers: { "Access-Control-Allow-Origin": "*" },
    }
  );

  res.status(200).json(geodata);
};
