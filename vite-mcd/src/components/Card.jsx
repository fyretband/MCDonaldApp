import { useEffect } from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingRow from "./LoadingRow";
import "./Card.css";
import Footer from "./Footer";
import { fetchFoods } from "../store/action/actionCreator";

function Card() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.foods?.foods);
  const loading = useSelector((state) => state.foods?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoods());
  }, []);

  const handleCardClick = (foodId) => {
    navigate(`/foods/${foodId}`);
  };

  return (
    <>
      <div className="card-container">
        {loading ? (
          <LoadingRow />
        ) : (
          data.map((food) => (
            <div className="card" key={food.id} onClick={() => handleCardClick(food.id)}>
              <img style={{ maxWidth: 200 }} src={food.imgUrl} alt="" />
              <h2>{food.name}</h2>
              <p>{food.description}</p>
              <h1>{food.price}</h1>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default Card;
