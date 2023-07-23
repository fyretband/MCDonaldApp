import {
  FOODS_LOADING,
  FOODS_SUCCESS,
  SET_EDITED_FOOD,
} from "../action/ActionType";
const initialState = {
  foods: [],
  loading: false,
  editedFood: {
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    category: "",
  },
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOODS_SUCCESS:
      return {
        ...state,
        foods: action.payload,
        loading: false,
      };
    case FOODS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_EDITED_FOOD:
      return {
        ...state,
        editedFood: action.payload,
      };
    default:
      return state;
  }
};

export default foodReducer;
