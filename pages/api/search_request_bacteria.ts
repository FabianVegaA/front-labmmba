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

  const { query } = req.query;

  const options = {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const responseBacteria = await fetch(
    `http://localhost:81/search/taxon/${query}`,
    options
  );

  const dataBacteria = await responseBacteria.json();

  res.status(200).json(dataBacteria);
}
