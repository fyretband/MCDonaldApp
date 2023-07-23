import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategory,
} from "../../store/action/ActionCreator";
import LoadingRow from "./LoadingRow";
import {useNavigate} from "react-router-dom"
function Category() {
  const navigate = useNavigate()
  const data = useSelector((state) => state.category?.category);
  const loading = useSelector((state) => state.category?.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const handleDelete = async (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };
  const handleEdit = (categoryId)=> {
    navigate(`/edit/category/${categoryId}`)
    console.log()
  }

  return (
    <>
      <div className="table-responsive" style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ marginRight: "auto" }}>CategoryList</h1>
            <button
              onClick={() => navigate(`/category/add`)}
              style={{ backgroundColor: "#007bff" }}
            >
              Create Category
            </button>
          </div>
        <table className="table table-striped" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Category</th>
              <th style={{ textAlign: "center" }}>CreatedAt</th>
              <th style={{ textAlign: "center" }}>UpdatedAt</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingRow />
            ) : (
              data.map((categori) => (
                <tr key={categori.id}>
                  <td style={{ textAlign: "center" }}>{categori.id}</td>
                  <td style={{ textAlign: "center" }}>{categori.name}</td>
                  <td style={{ textAlign: "center" }}>{categori.createdAt}</td>
                  <td style={{ textAlign: "center" }}>{categori.updatedAt}</td>
                  <td style={{ display: "flex", alignItems: "center" }}>
                      <button
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => handleEdit(categori.id)}
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(categori.id)}
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
    </>
  );
}

export default Category;
