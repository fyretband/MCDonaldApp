import React, { useState, useEffect } from "react";
import "./AddForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFood, fetchCategory } from "../../store/action/ActionCreator";

const AddForm = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.category?.category);
  const loading = useSelector((state) => state.category?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const [ingredients, setIngredients] = useState([""]);

  const handleIngredientChange = (index, event) => {
    const values = [...ingredients];
    values[index] = event.target.value;
    setIngredients(values);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, description, price, imgUrl, category } = event.target;
    if (!name.value || !description.value || !price.value || !imgUrl.value || !category.value || ingredients.includes("")) {
      console.error("Error: All fields are required");
      return;
    }

    try {
      const response = await dispatch(
        addFood({
          name: name.value,
          description: description.value,
          price: price.value,
          imgUrl: imgUrl.value,
          categoryId: category.value,
          ingredients: ingredients.filter((ingredient) => ingredient !== ""),
        })
      );

      if (response && response.token) {
        localStorage.setItem("accessToken", response.token);
      }

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form
        style={{ marginLeft: 400, marginTop: 70 }}
        className="add-form"
        onSubmit={handleSubmit}
      >
        <h1 style={{ textAlign: "center" }}>Add Form</h1>
        <div className="form-group">
          <label className="form-label">
            Name:
            <input className="form-input" type="text" name="name" />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Description:
            <textarea className="form-input" name="description"></textarea>
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Price:
            <input className="form-input" type="number" name="price" />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Image URL:
            <input className="form-input" type="text" name="imgUrl" />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Category:
            <select className="form-input" name="category">
              <option value="">Select category</option>
              {data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-container">
              <input
                className="form-input"
                type="text"
                value={ingredient}
                onChange={(event) => handleIngredientChange(index, event)}
              />
              <button
               style={{backgroundColor: "#CD1818"}}
                className="remove-ingredient-btn"
                type="button"
                onClick={() => handleRemoveIngredient(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            style={{backgroundColor: "#007bff"}}
            className="add-ingredient-btn"
            type="button"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
        <button className="submit-btn" type="submit">
          Add Food
        </button>
      </form>
    </>
  );
};

export default AddForm;
