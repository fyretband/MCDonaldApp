import { useEffect } from "react";
import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFoods,
  fetchFoodsSuccess,
  fetchFoodLoading,
  deleteFood,
} from "../../store/action/ActionCreator";
import LoadingRow from "./LoadingRow";
function Table() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.foods?.foods);
  const loading = useSelector((state) => state.foods?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoods());
  }, []);

  const handleDelete = async (foodId) => {
    dispatch(deleteFood(foodId));
  };
  const handleEdit = (foodId) => {
    navigate(`/edit/${foodId}`);
    console.log(foodId);
  };

  return (
    <>
      <div>
        <div className="table-responsive">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ marginRight: "auto" }}>FoodList</h1>
            <button
              onClick={() => navigate(`/add`)}
              style={{ backgroundColor: "#007bff" }}
            >
              Create Food
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Description</th>
                <th style={{ textAlign: "center" }}>price</th>
                <th style={{ textAlign: "center" }}>Category</th>
                <th style={{ textAlign: "center" }}>image</th>
                <th style={{ textAlign: "center" }}>Ingredients</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <LoadingRow />
              ) : (
                data.map((food) => (
                  <tr key={food.id}>
                    <td style={{ textAlign: "center" }}>{food.id}</td>
                    <td style={{ textAlign: "center" }}>{food.name}</td>
                    <td style={{ textAlign: "center" }}>{food.description}</td>
                    <td style={{ textAlign: "center" }}>{food.price}</td>
                    <td style={{ textAlign: "center" }}>
                      {food.Category.name}
                    </td>
                    <td>
                      <img style={{ maxWidth: 150 }} src={food.imgUrl} alt="" />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {food?.Ingredients?.map((ingredient, index) => (
                        <span key={ingredient.id}>
                          {ingredient.name}
                          {index !== food.Ingredients.length - 1 && <>&nbsp;</>}
                        </span>
                      ))}
                    </td>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      <button
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => handleEdit(food.id)}
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(food.id)}
                      >
                        <FaTrash style={{ color: "red" }} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
