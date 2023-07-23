import {
  ADD_FOOD,
  UPDATE_FOOD_SUCCESS,
  UPDATE_FOOD_FAILURE,
} from "../action/ActionType";
const initialState = {
  newFood: {
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    category: "",
    ingredient: "",
  },
};

const addFoodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOOD:
      return {
        ...state,
        newFood: {
          name: "",
          description: "",
          price: "",
          imgUrl: "",
          category: "",
          ingredient: "",
        },
      };

    default:
      return state;
  }
};

export default addFoodReducer;
