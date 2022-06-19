import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import type { NextApiRequest, NextApiResponse } from "next";

// Init middleware
const cors = initMiddleware(Cors({ methods: ["GET", "POST"] }));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await cors(req, res);

  // const { market } = req.query;

  const response = await fetch(
    `http://localhost:80/search/62ae990fad6e7bc3910c33ac`
  );

  const data = await response.json();

  res.status(200).json(data);
}
