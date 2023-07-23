import { API_URL } from "../../config/api";
import { fetchHelper } from "../../helpers/fetch";
import { FOODS_LOADING, FOODS_SUCCESS,FOODS_DETAIL_SUCCESS } from "./actionType";

  
  export const fetchFoodsSuccess = (payload) => ({
    type: FOODS_SUCCESS,
    payload,
  });
  export const fetchFoodLoading = (payload) => ({
    type: FOODS_LOADING,
    payload,
  });
  export const fetchFoodDetailSuccess = (payload)=> ({
    type: FOODS_DETAIL_SUCCESS,
    payload
  })
 
  
 
  

  
  export const fetchFoods = () => {
    return (dispatch, getState) => {
      dispatch(fetchFoodLoading(true));
      setTimeout(() => {
        fetchHelper(API_URL + "pub/foods")
          .then((data) => dispatch(fetchFoodsSuccess(data.message.food)))
          .finally(() => dispatch(fetchFoodLoading(false)));
      }, 900);
    };
  };

  export const fetchFoodDetail = (foodId) => {
    return (dispatch, getState) => {
      dispatch(fetchFoodLoading(true));
      setTimeout(() => {
        fetchHelper(API_URL + `pub/foods/${foodId}`)
          .then((data) => dispatch(fetchFoodDetailSuccess(data.message.food)))
          .finally(() => dispatch(fetchFoodLoading(false)));
      }, 900);
    };
  };
  
  

  


  
  
  