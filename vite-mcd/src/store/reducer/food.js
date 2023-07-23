import {
  FOODS_LOADING,
  FOODS_SUCCESS,
  FOODS_DETAIL_SUCCESS,
} from "../action/actionType";

const initialState = {
  foods: [],
  foodDetail: [],
  loading: false,
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOODS_SUCCESS:
      return {
        ...state,
        foods: action.payload,
        loading: false,
      };
    case FOODS_DETAIL_SUCCESS:
      return {
        ...state,
        foodDetail: action.payload,
        loading: false,
      };
    case FOODS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default foodReducer;
