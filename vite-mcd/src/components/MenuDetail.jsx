import { useParams } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFoodDetail, fetchFoods } from "../store/action/actionCreator";
import LoadingRow from "./LoadingRow";

function FoodDetail() {
  const { foodId } = useParams();
  const data = useSelector((state) => state.foods?.foodDetail);
  const loading = useSelector((state) => state.foods?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoodDetail(foodId));
    dispatch(fetchFoods());
  }, [dispatch, foodId]);

  if (loading) {
    return <LoadingRow />;
  }

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>{data?.name}</h1>
      <img style={{ maxWidth: 200, margin: "0 auto" }} src={data?.imgUrl} alt="" />
      <h2>
        <strong>Category</strong>
        <br />
        {data?.Category?.name}
      </h2>
      <h2>
        <strong>Price:</strong>
        <br />
        {data?.price}
      </h2>
      <h2>
        <strong>Ingredients:</strong>
      </h2>
      <p>
        {data?.Ingredients?.map((ingredient, index) => (
          <span key={ingredient.id}>
            {ingredient.name}
            {index !== data.Ingredients.length - 1 && <>&nbsp;</>}
          </span>
        ))}
      </p>
      <p>
        <strong>Description:</strong>
        <br />
        {data?.description}
      </p>
    </div>
  );
}

export default FoodDetail;
