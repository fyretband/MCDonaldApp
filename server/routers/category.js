const express = require("express");
const CategoryController = require("../controllers/categoryController");

const authentication = require("../middleware/authentication");


const router = express.Router();


router.get('/category', authentication,CategoryController.findCategory)

router.post('/category', authentication,CategoryController.createCategory)
router.get('/category/:categoryId',authentication, CategoryController.findOneCategory)
router.put('/category/:categoryId',authentication, CategoryController.updateCategory)
router.delete('/category/:categoryId',authentication, CategoryController.deleteCategory)
module.exports = router