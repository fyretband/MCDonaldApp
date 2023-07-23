const express = require("express");
const router = express.Router();


const userRouter = require('./user')
const categoryRouter = require('./category')
const itemRouter = require('./item')
const userInterFaceRouter = require("./userInterface")
const authentication = require('../middleware/authentication')


const UserController = require("../controllers/userController");


router.use('/', userRouter)
router.use('/pub', userInterFaceRouter)
// router.use(authentication)
router.use('/', categoryRouter)
router.use('/', itemRouter)



module.exports = router