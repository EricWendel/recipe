import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
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

    res.status(201).json({
      title: title,
      recipeName: title.replace(/ /g, ""),
      user: user,
      image: image,
      desc: desc,
    });
  }
}
