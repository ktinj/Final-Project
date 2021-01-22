const router = require("express").Router();
const saveController = require("../../controllers/saveController");

router
  .route("/")
  .post(saveController.create)
  .get(saveController.findAll)
// router
//   .route("/:id")
//   .post(saveController.findAndUpdate)

module.exports = router;
