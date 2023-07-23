import { CATEGORY_SUCCESS, CATEGORY_LOADING, SET_EDITED_CATEGORY } from "../action/ActionType";

const initialState = {
  category: [],
  loading: false,
  editedCategory: {
    name: "",
  },
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case CATEGORY_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_EDITED_CATEGORY:
      return {
        ...state,
        editedCategory: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
