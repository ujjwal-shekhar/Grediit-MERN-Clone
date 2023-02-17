const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const user_controller = require("../controllers/userController");

// Get list of all users
router.get('/', user_controller.user_list);

// Create a user account using GET and POST methods
router.get('/create', user_controller.user_create_get);
router.post('/create', user_controller.user_create_post);

// Validate user login using POST method
router.post('/login', user_controller.user_login_post);

// Get details of a user by their id
router.get('/:username', user_controller.user_detail);

// Delete a user by their id using GET and POST methods
router.get('/:id/delete', user_controller.user_delete_get);
router.post('/:id/delete', user_controller.user_delete_post);


// Get the profile page
router.get('/:id/profile', verifyToken, user_controller.user_profile_get);

// Get followers of a user
router.get('/:username/followers', verifyToken, user_controller.user_followers_get);

// Get following of a user
router.get('/:username/following', verifyToken, user_controller.user_following_get);

// Post a new follower to a user
router.get(
    '/:username/followers/add/:follower',
    verifyToken,
    user_controller.user_add_follower_post
)

// Get user following and follower counts
router.get('/:username/socials/count', verifyToken, user_controller.user_following_followers_count_get);

module.exports = router;