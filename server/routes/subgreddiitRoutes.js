const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const subgreddiit_controller = require("../controllers/subgreddiitController");

router.get("/", subgreddiit_controller.subgreddiit_list);

// router.get("/create", verifyToken, subgreddiit_controller.subgreddiit_create_test);
router.post("/create", verifyToken, subgreddiit_controller.subgreddiit_create);

router.get("/mod_subgreddiits_list", verifyToken, subgreddiit_controller.subgreddiit_moderator_list);

router.get("/SG/:name/perms", verifyToken, subgreddiit_controller.subgreddiit_moderator_check)

router.get("/SG/:name", verifyToken, subgreddiit_controller.subgreddiit_detail);

router.get("/SG/:name/members_list", subgreddiit_controller.subgreddiit_members);
module.exports = router;