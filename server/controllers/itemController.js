const { sequelize } = require("../models");
const { Item, Category, Ingredient } = require("../models/index");

class ItemController {
  static async findFoods(req, res, next) {
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
        order: [["id", "ASC"]],
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

  static async findOneFood(req, res, next) {
    try {
      const { foodId } = req.params;

      const food = await Item.findOne({
        where: { id: foodId },
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

  static async updateFoodWithCategory(req, res, next) {
    try {
      const { foodId } = req.params;
      const { name, description, price, imgUrl, categoryId } = req.body;

      const food = await Item.findByPk(foodId);

      if (!food) {
        throw { name: "notFound" };
      }
      const updatedFood = await food.update({
        name,
        description,
        price,
        imgUrl,
        categoryId: categoryId,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Food updated successfully",
        data: {
          food: updatedFood,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  static async createFoodWithIngredients(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, imgUrl, categoryId, ingredients } =
        req.body;

      const category = await Category.findByPk(categoryId, { transaction: t });

      if (!category) {
        throw { name: "CategoryNotFound" };
      }

      const userId = req.additionalData;

      const createdFood = await Item.create(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId: categoryId,
          authorId: userId.userId,
        },
        { transaction: t }
      );

      const ingredientObjects = ingredients.map((ingredient) => {
        return { name: ingredient };
      });

      const createdIngredients = await Ingredient.bulkCreate(
        ingredientObjects,
        { transaction: t }
      );

      await createdFood.addIngredients(createdIngredients, { transaction: t });

      await t.commit();

      res.status(201).json({
        statusCode: 201,
        message: "Food created successfully with ingredients",
        data: {
          food: createdFood,
          ingredients: createdIngredients,
        },
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async deleteFoodWithIngredients(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { foodId } = req.params;

      const food = await Item.findByPk(foodId, { transaction: t });

      if (!food) {
        throw { name: "FoodNotFound" };
      }

      await Ingredient.destroy({ where: { itemId: foodId }, transaction: t });

      await food.destroy({ transaction: t });

      await t.commit();

      res.status(200).json({
        statusCode: 200,
        message: "Food and its ingredients deleted successfully",
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}
module.exports = ItemController;
