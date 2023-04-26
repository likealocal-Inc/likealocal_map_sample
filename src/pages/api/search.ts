// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { search } = req.query;
  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${search}`;
  const response = await fetch(
    // `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=서울특별시 마포구 와우산로 94`,
    url,
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "01gns67yau",
        "X-NCP-APIGW-API-KEY": "mZ8mst5crgIEw8vzU5H4SBLNbpmXJnpxPlC9IHYb",
      },
    }
  );

  const data = await response.json();
  res.status(200).send(data);
}
