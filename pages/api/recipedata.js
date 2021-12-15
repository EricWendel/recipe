export default function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.body;
    const dataStructure = [
      // These will be from a database later
      {
        id: "0",
        title: "Chicken Sandwich",
        image:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-211105-popeyes-chicken-sandwich-001-ab-web-1637207425.jpg?crop=0.687xw:0.715xh;0.177xw,0.168xh&resize=640:*",
        desc: "A really good chicken sandwich",
      },
      {
        id: "1",
        title: "Apple Pie",
        image:
          "https://cdn3.tmbi.com/toh/GoogleImagesPostCard/exps6086_HB133235C07_19_4b_WEB.jpg",
        desc: "A really good apple pie",
      },
      {
        id: "2",
        title: "Muffin",
        image: "https://www.joyofbaking.com/images/facebook/mochamuffins1.jpg",
        desc: "A really good muffin",
      },
    ];
    res.status(200).json(
      dataStructure.find((item) => {
        return item.id == id;
      })
    );
  }
}
