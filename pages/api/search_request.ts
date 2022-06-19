import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import type { NextApiRequest, NextApiResponse } from "next";

// Init middleware
const cors = initMiddleware(Cors({ methods: ["POST"] }));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await cors(req, res);

  const { query, source } = req.query;

  const options = {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `http://localhost:80/search/${source}/?query=${query}`,
    options
  );

  const data = await response.json();

  res.status(200).json(data);
}
