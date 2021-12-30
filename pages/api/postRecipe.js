import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "POST" && session) {
    const { title, user, email, image, desc } = req.body;
    const prisma = new PrismaClient();
    const result = await prisma.recipe.create({
      data: {
        title: title,
        recipeName: title.replace(/ /g, ""),
        user: user,
        email: email,
        image: image,
        description: desc,
      },
    });

    res.status(201).json({
      title: title,
      recipeName: title.replace(/ /g, ""),
      user: user,
      email: email,
      image: image,
      description: desc,
    });
  } else {
    res.status(401).json({});
  }
}
