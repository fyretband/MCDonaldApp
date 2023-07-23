import "../App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Card from "../components/Card";
import App from "../App";
import BannerCarousel from "../components/BannerCarousel";
import Header from "../components/Navbar";
import FoodDetail from "../components/MenuDetail";
import Footer from "../components/Footer";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <BannerCarousel />
        <Card />
      </>
    ),
  },
  {
    path: "/menu",
    element: (
      <>
        <Header />
        <Card />
      </>
    ),
  },
  {
    path: "/foods/:foodId",
    element: (
      <>
        <Header />
        <FoodDetail />
        <Footer/>
      </>
    ),
  },
]);

export default router;
