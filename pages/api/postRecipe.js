import { getSession } from "next-auth/react";
import { prisma } from "../../db/index.ts";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "POST" && session) {
    const { title, user, email, image, desc } = req.body;
    const result = await prisma.recipe.create({
      data: {
        title: title,
        recipeName: title.replace(/ /g, ""),
        user: user,
        email: email,
        image: image,
        description: desc,
        rating: 0.0,
      },
    });

    res.status(201).json({
      title: title,
      recipeName: title.replace(/ /g, ""),
      user: user,
      email: email,
      image: image,
      description: desc,
      rating: 0.0,
    });
  } else {
    res.status(401).json({});
  }
}
