const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

router.get('/', user_controller.user_list);

// Get list of all users
router.get('/users', user_controller.user_list);

// Create a user account using GET and POST methods
router.get('/user/create', user_controller.user_create_get);
router.post('/user/create', user_controller.user_create_post);

// Get details of a user by their id
router.get('/user/:id', user_controller.user_detail);

// Delete a user by their id using GET and POST methods
router.get('/user/:id/delete', user_controller.user_delete_get);
router.post('/user/:id/delete', user_controller.user_delete_post);

// Update user by their id using GET and POST methods
router.get('/user/:id/update', user_controller.user_update_get);
router.post('/user/:id/update', user_controller.user_update_post);