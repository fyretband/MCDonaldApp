const express = require("express");
const UserInterfaceController = require("../controllers/userInterfaceController");

const authentication = require("../middleware/authentication");


const router = express.Router();

router.get('/foods',  UserInterfaceController.fetchFoods)


router.get('/foods/:foodId', UserInterfaceController.findDetailFood)
module.exports = router