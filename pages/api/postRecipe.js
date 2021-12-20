import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "POST" && session) {
    const { title, user, image, desc } = req.body;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const collection = db.collection("recipes");
    const result = await collection.insertOne({
      title: title,
      recipeName: title.replace(/ /g, ""),
      user: user,
      image: image,
      desc: desc,
    });
    client.close();

    console.log("success");

    res.status(201).json({
      title: title,
      recipeName: title.replace(/ /g, ""),
      user: user,
      image: image,
      desc: desc,
    });
  } else {
    res.status(401).json({});
  }
}
