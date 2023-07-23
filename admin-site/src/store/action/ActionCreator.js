import Swal from "sweetalert2";
import {
  CATEGORY_LOADING,
  CATEGORY_SUCCESS,
  FOODS_LOADING,
  FOODS_SUCCESS,
  ADD_FOOD,
  UPDATE_FOOD_SUCCESS,
  UPDATE_FOOD_FAILURE,
  SET_EDITED_CATEGORY,
  SET_EDITED_FOOD,
  FOODS_FAILURE,
} from "./ActionType";
import { API_URL } from "../../config/api";
import { fetchHelper } from "../../helpers/fetch";
export const fetchFoodsSuccess = (payload) => ({
  type: FOODS_SUCCESS,
  payload,
});
export const fetchFoodLoading = (payload) => ({
  type: FOODS_LOADING,
  payload,
});
export const fetchCategoryLoading = (payload) => ({
  type: CATEGORY_LOADING,
  payload,
});

export const fetchCategorySuccess = (payload) => ({
  type: CATEGORY_SUCCESS,
  payload,
});

export const fetchCategory = () => {
  return (dispatch, getState) => {
    dispatch(fetchCategoryLoading(true));
    setTimeout(() => {
      fetchHelper(API_URL + "category")
        .then((data) => dispatch(fetchCategorySuccess(data.message.category)))
        .finally(() => dispatch(fetchCategoryLoading(false)));
    }, 900);
  };
};

export const fetchFoods = () => {
  return (dispatch, getState) => {
    dispatch(fetchFoodLoading(true));
    setTimeout(() => {
      fetchHelper(API_URL + "foods")
        .then((data) => {
          dispatch(fetchFoodsSuccess(data.message.food));
          dispatch(fetchFoodLoading(false));
        })
        .catch((error) => {
          console.error("Error fetching foods:", error);
          dispatch(fetchFoodLoading(false));
        });
    }, 900);
  };
};

export const deleteFood = (foodId) => {
  return async (dispatch, getState) => {
    try {
      const result = await Swal.fire({
        icon: "question",
        title: "Are you sure want to delete?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await fetch(`${API_URL}foods/${foodId}`, {
          method: "DELETE",
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        });
        dispatch(fetchFoods());
        Swal.fire({
          icon: "success",
          title: "Food deleted successfully!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to delete food",
        text: error.message || "Please try again later.",
      });
      throw error;
    }
  };
};

export const deleteCategory = (categoryId) => {
  return async (dispatch, getState) => {
    try {
      const result = await Swal.fire({
        icon: "question",
        title: "Are you sure want to delete?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await fetch(`${API_URL}category/${categoryId}`, {
          method: "DELETE",
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        });
        dispatch(fetchCategory());
        Swal.fire({
          icon: "success",
          title: "Category deleted successfully!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to delete category",
        text: error.message || "Please try again later.",
      });
      throw error;
    }
  };
};

export const addFood = (payload) => {
  return async (dispatch) => {
    try {
      const { name, description, price, categoryId, ingredients } = payload;
      if (!name || !description || !price || !categoryId || !ingredients) {
        throw new Error("All fields are required");
      }

      const response = await fetch(`${API_URL}foods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          name,
          description,
          price,
          imgUrl: payload.imgUrl,
          categoryId,
          ingredients,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: ADD_FOOD,
          payload: data.food,
        });

        Swal.fire({
          icon: "success",
          title: "Food added successfully!",
        });
      } else {
        throw new Error(data.message || "Failed to add food");
      }

      return data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add food",
        text: error.message || "Please try again later.",
      });
      throw error;
    }
  };
};
export const addAdmin = (payload) => {
  return async (dispatch) => {
    try {
      const { username, email, password, role, phoneNumber, address } = payload;
      if (
        !username ||
        !email ||
        !password ||
        !role ||
        !phoneNumber ||
        !address
      ) {
        throw new Error("All fields are required");
      }

      const admin = await fetchHelper(API_URL + "register", "POST", payload);
      dispatch(fetchFoods());

      Swal.fire({
        icon: "success",
        title: "Admin added successfully!",
      });

      return admin;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add admin",
        text: error.message || "Please try again later.",
      });
      throw error;
    }
  };
};

export const addCategory = (payload) => {
  return async (dispatch) => {
    try {
      const { name } = payload;
      if (!name) {
        throw new Error("All fields are required");
      }

      const category = await fetchHelper(API_URL + "category", "POST", payload);
      dispatch(fetchCategory());

      Swal.fire({
        icon: "success",
        title: "Category added successfully!",
      });

      return category;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add category",
        text: error.message || "Please try again later.",
      });
      throw error;
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        const accessToken = data.token;
        console.log(accessToken);
        localStorage.setItem("accessToken", accessToken);

        Swal.fire({
          icon: "success",
          title: "Login successful!",
        });

        return true;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message || "Please try again later.",
      });

      throw error;
    }
  };
};

export const fetchCategoryDetail = (categoryId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}category/${categoryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("accessToken"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Category:", data);

        dispatch(
          setEditedCategory({
            name: data.message.category.name,
          })
        );
      } else {
        console.log("Failed to fetch Category:", response.statusText);
      }
    } catch (error) {
      throw error;
    }
  };
};
export const setEditedCategory = (category) => {
  return {
    type: SET_EDITED_CATEGORY,
    payload: category,
  };
};

export const updateCategory = (categoryId, categoryData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}category/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Category updated successfully!",
        });
        console.log("Category updated successfully!");
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Failed to update Category",
          text: data.message || "Please try again later.",
        });
        console.error("Failed to update Category:", data.message);
      }
    } catch (error) {
      throw error;
    }
  };
};

export const fetchFoodDetail = (foodId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}foods/${foodId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("accessToken"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Food:", data);

        dispatch(
          setEditedFood({
            name: data.message.food.name,
            description: data.message.food.description,
            price: data.message.food.price,
            imgUrl: data.message.food.imgUrl,
            category: data.message.food.categoryId,
          })
        );
      } else {
        console.log("Failed to fetch food:", response.statusText);
      }
    } catch (error) {
      throw error;
    }
  };
};
export const updateFood = (foodId, editedFood) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}foods/${foodId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          name: editedFood.name,
          description: editedFood.description,
          price: editedFood.price,
          imgUrl: editedFood.imgUrl,
          categoryId: editedFood.category,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Food updated successfully!",
        });
        console.log("Food updated successfully!");
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Failed to update food",
          text: data.message || "Please try again later.",
        });
        console.error("Failed to update food:", data.message);
      }
    } catch (error) {
      throw error;
    }
  };
};

export const setEditedFood = (food) => {
  return {
    type: SET_EDITED_FOOD,
    payload: food,
  };
};

export const updateFoodSuccess = () => {
  return {
    type: UPDATE_FOOD_SUCCESS,
  };
};

export const updateFoodFailure = (error) => {
  return {
    type: UPDATE_FOOD_FAILURE,
    payload: error,
  };
};
