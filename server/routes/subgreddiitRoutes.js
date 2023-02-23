const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const subgreddiit_controller = require("../controllers/subgreddiitController");

router.get("/", subgreddiit_controller.subgreddiit_list);

router.post("/create", verifyToken, subgreddiit_controller.subgreddiit_create);

router.get("/mod_subgreddiits_list", verifyToken, subgreddiit_controller.subgreddiit_moderator_list);
router.get("/non_member_subgreddiits", verifyToken, subgreddiit_controller.subgreddiit_non_member_list);

router.get("/SG/:name/perms", verifyToken, subgreddiit_controller.subgreddiit_moderator_check)

router.get("/SG/:name", verifyToken, subgreddiit_controller.subgreddiit_detail);

router.get("/SG/:name/members_list", subgreddiit_controller.subgreddiit_members);

router.get("/SG/:name/posts", verifyToken, subgreddiit_controller.subgreddiit_posts);

router.post("/SG/create/post", verifyToken, subgreddiit_controller.subgreddiit_create_post_content)

router.get("/SG/:name/post/:post/details", verifyToken, subgreddiit_controller.subgreddiit_post_details)

router.post("/SG/:name/post/:post/comment", verifyToken, subgreddiit_controller.subgreddiit_post_comment)

router.get("/SG/:name/join_request", verifyToken, subgreddiit_controller.subgreddiit_request_membership)

router.post("/SG/:name/join_request/accept", verifyToken, subgreddiit_controller.subgreddiit_accept_membership)
router.post("/SG/:name/join_request/reject", verifyToken, subgreddiit_controller.subgreddiit_reject_membership)

router.post("/SG/:name/reports/:report_id/ignore", verifyToken, subgreddiit_controller.subgreddiit_ignore_report)
router.post("/SG/:name/reports/:report_id/block", verifyToken, subgreddiit_controller.subgreddiit_block_report)
router.get("/SG/:name/reports", verifyToken, subgreddiit_controller.subgreddiit_get_all_reports)

router.delete("/SG/:name/post/:postID", verifyToken, subgreddiit_controller.subgreddiit_delete_post)

router.delete("/SG/:name/delete", verifyToken, subgreddiit_controller.subgreddiit_delete)

router.get("/SG/:name/report/:report_id", verifyToken, subgreddiit_controller.subgreddiit_get_report_by_id)

router.post("/SG/:name/post/:postID/create/report", verifyToken, subgreddiit_controller.subgreddiit_create_report)

router.get("/SG/:name/leave", verifyToken, subgreddiit_controller.subgreddiit_leave);

router.post("/SG/:name/post/:postID/vote", verifyToken, subgreddiit_controller.subgreddiit_post_vote)

router.post("/SG/:name/post/:postID/save", verifyToken, subgreddiit_controller.subgreddiit_save_post)

router.post("/SG/:name/check_blocked", verifyToken, subgreddiit_controller.subgreddiit_check_blocked);

// router.put("/SG/:name/post/:postID/save", verifyToken, subgreddiit_controller.subgreddiit_save_post)

module.exports = router;