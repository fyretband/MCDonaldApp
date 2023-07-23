import {
    ADD_CATEGORY

  } from "../action/ActionType";
  const initialState = {
    newCategory: {
      name: "",
    
    },
  };
  
  const addCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_CATEGORY:
        return {
          ...state,
          newFood: {
            name: "",
           
          },
        };
      
        
      default:
        return state;
    }
  };
  
  export default addCategoryReducer;