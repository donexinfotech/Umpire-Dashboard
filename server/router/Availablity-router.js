const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const { Available, getAllUmpires } = require("../controllers/Availablity-controller");

router.route('/').post(authMiddleware, Available);
router.route('/get').get(getAllUmpires);

module.exports = router;