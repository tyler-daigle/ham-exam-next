import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Getting general exam - not yet");
  res.status(404).send("Not yet implemented");
}