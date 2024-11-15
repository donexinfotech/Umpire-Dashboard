const express = require("express");
const router = express.Router();
const {review, reviewUser} = require("../controllers/Reviews")

router.route("/").post(review)
router.route("/:userId").get(reviewUser)

module.exports = router