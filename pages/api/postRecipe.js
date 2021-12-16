export default function handler(req, res) {
  if (req.method === "POST") {
    const { title, user, image, desc } = req.body;
    // Need to setup database before this is useful
    res.status(200).json({
      title: title,
      recipeName: title.replace(/ /g, ""),
      user: user,
      image: image,
      desc: desc,
    });
  }
}
