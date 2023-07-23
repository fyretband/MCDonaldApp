const express = require("express");
const UserController = require("../controllers/userController");

const authentication = require("../middleware/authentication");


const router = express.Router();

router.post('/login', UserController.login)

router.post('/register',authentication, UserController.register)



module.exports = router