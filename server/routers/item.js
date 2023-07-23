const express = require("express");
const ItemController = require("../controllers/itemController");
const authentication = require("../middleware/authentication");




const router = express.Router();

// router.use(authentication)
router.get('/foods',authentication, ItemController.findFoods)

router.post('/foods',authentication, ItemController.createFoodWithIngredients)
router.get('/foods/:foodId',authentication, ItemController.findOneFood)
router.put('/foods/:foodId',authentication, ItemController.updateFoodWithCategory)
router.delete('/foods/:foodId',authentication, ItemController.deleteFoodWithIngredients)
module.exports = router