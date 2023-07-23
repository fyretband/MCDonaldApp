import React, { useEffect } from "react";
import { useParams } from "react-router";
import "./EditForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryDetail,
  setEditedCategory,
  updateCategory,
} from "../../store/action/ActionCreator";

const EditCategoryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editedCategory = useSelector((state) => state.category.editedCategory);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryDetail(categoryId));
    }
  }, [categoryId, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(
      setEditedCategory({
        ...editedCategory,
        [name]: value,
      })
    );
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateCategory(categoryId, { name: editedCategory.name }));
    navigate("/category");
  };

  return (
    <>
      <form
        style={{ marginLeft: 400, marginTop: 70 }}
        className="add-form"
        onSubmit={handleUpdate}
      >
        <h1 style={{ textAlign: "center" }}>Edit Category</h1>
        <div className="form-group">
          <label className="form-label">
            Name:
            <input
              className="form-input"
              type="text"
              name="name"
              value={editedCategory.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="submit-btn" type="submit">
          Edit Category
        </button>
      </form>
    </>
  );
};
export default EditCategoryForm;
