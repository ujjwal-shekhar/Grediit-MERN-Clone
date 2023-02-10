const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const subgreddiit_controller = require("../controllers/subgreddiitController");

router.get("/", subgreddiit_controller.subgreddiit_list);

// router.get("/create", verifyToken, subgreddiit_controller.subgreddiit_create_test);
router.post("/create", verifyToken, subgreddiit_controller.subgreddiit_create);

module.exports = router;