import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const geo = await fetch(
    `http://ip-api.com/json/${
      req.body || req.query
    }?fields=status,message,continent,country,regionName,city,district,zip,lat,lon,timezone,isp,org,as,asname,mobile,proxy,hosting,query`,
    {
      method: "GET",
      headers: { "Access-Control-Allow-Origin": "*" },
    }
  );

  res.status(200).json(await geo.json());
};
