import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./EditForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  fetchFoodDetail,
  setEditedFood,
  updateFood,
} from "../../store/action/ActionCreator";

const EditForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category?.category);
  const [loading, setLoading] = useState(true);
  const { foodId } = useParams();
  const editedFood = useSelector((state) => state.foods.editedFood);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (foodId) {
      dispatch(fetchFoodDetail(foodId))
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, foodId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setEditedFood({ ...editedFood, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await dispatch(updateFood(foodId, editedFood));
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <form
        style={{ marginLeft: 400, marginTop: 50 }}
        className="edit-form"
        onSubmit={handleUpdate}
      >
        <h1 style={{ textAlign: "center" }}>Edit Form</h1>
        <div className="form-group">
          <label className="form-label">
            Name:
            <input
              className="form-input"
              type="text"
              name="name"
              value={editedFood.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Description:
            <textarea
              className="form-input"
              name="description"
              value={editedFood.description}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Price:
            <input
              className="form-input"
              type="number"
              name="price"
              value={editedFood.price}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Image URL:
            <input
              className="form-input"
              type="text"
              name="imgUrl"
              value={editedFood.imgUrl}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Category:
            <select
              className="form-input"
              name="category"
              value={editedFood.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {category.map((categori) => (
                <option key={categori.id} value={categori.id}>
                  {categori.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* <div className="form-group">
          <label className="form-label">
            Ingredient:
            <input
              className="form-input"
              type="text"
              name="ingredient"
              value={editedFood.ingredient}
              onChange={handleChange}
            />
          </label>
        </div> */}
        <button className="submit-btn" type="submit">
          Update Food
        </button>
      </form>
    </>
  );
};

export default EditForm;
