const { Router } = require("express");
const Image = require("../models").image;

const router = new Router();

//get all the images
// router.get("/", async (req, res, next) => {
//   try {
//     const images = await Image.findAll();
//     res.json(images);
//   } catch (e) {
//     next(e);
//   }
// });

// PAGINATION so to not load everything at once
router.get("/", async (req, res, next) => {
  //console.log("hello?");
  try {
    const limit = Math.min(req.query.limit || 25, 500); // 500 is the MAX
    const offset = req.query.offset || 0;
    //console.log("limit", req.query.limit);
    //console.log("offset", offset);

    const images = await Image.findAndCountAll({ limit, offset });
    res.json(images);
  } catch (e) {
    next(e);
  }
});

// get one image
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneImage = await Image.findByPk(id);

    if (!oneImage) {
      res.status(404).send("No Image found");
    } else {
      res.json(oneImage);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(400).send("missing params");
    } else {
      const newImg = await Image.create(req.body);
      res.json(newImg);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
