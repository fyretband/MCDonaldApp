const { Item, Category, Ingredient } = require("../models/index");

class UserInterfaceController{
    static async fetchFoods(req, res, next) {
        try {
          const food = await Item.findAll({
            include: [
              {
                model: Category,
              },
              {
                model: Ingredient,
              },
            ],
          });
    
          res.status(200).json({
            statusCode: 200,
            message: {
              food,
            },
          });
        } catch (err) {
          next(err);
        }
      }
      static async findDetailFood(req, res, next) {
        try {
          const { foodId } = req.params;
    
          const food = await Item.findOne({
            where: { id:foodId },
            include: [
              {
                model: Category,
              },
              {
                model: Ingredient,
              },
            ],
          });
    
          if (!food) {
            return res.status(404).json({
              statusCode: 404,
              message: "Food not found",
            });
          }
    
          res.status(200).json({
            statusCode: 200,
            message: {
              food,
            },
          });
        } catch (err) {
          next(err);
        }
      }
}

module.exports = UserInterfaceController