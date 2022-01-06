import { getSession } from "next-auth/react";
import { prisma } from "../../db/index";
import type { NextApiRequest, NextApiResponse } from "next";
import { Recipe } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (req.method === "POST" && session) {
    const r: Recipe = req.body.r;
    console.log(r);
    const result = await prisma.recipe.create({
      data: r,
    });
    res.status(201).json({ r });
  } else {
    res.status(401).json({});
  }
}
