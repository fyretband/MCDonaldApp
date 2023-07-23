const { Category } = require("../models/index");

class CategoryController {
  static async findCategory(req, res, next) {
    try {
      const category = await Category.findAll();
      
      res.status(200).json({
        statusCode: 200,
        message: {
          category,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  static async findOneCategory(req, res, next) {
    try {
      const { categoryId } = req.params;

      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({
          statusCode: 404,
          message: "Category not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: {
          category,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const created = await Category.create({
        name,
      });
      if (!created) {
        throw { name: "SequelizeValidationError" };
      }
      if (created) {
        res.status(201).json({
          statusCode: 201,
          message: "Category created successfully",
          data: created,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async updateCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;

      const category = await Category.findByPk(categoryId);

      if (!category) {
        throw { name: "notFound" };
      }

      const updated = await category.update({ name });

      res.status(200).json({
        statusCode: 200,
        message: "Category updated successfully",
        data: {
          id: categoryId,
          name: updated.name,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;

      const category = await Category.findByPk(categoryId);

      if (!category) {
        throw { name: "notFound" };
      }

      await category.destroy();

      res.status(200).json({
        statusCode: 200,
        message: "Category deleted successfully",
        data: {
          id: categoryId,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = CategoryController;
