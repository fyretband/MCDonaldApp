import LoginForm from "../assets/components/LoginForm";
import Table from "../assets/components/TableUtama";
import AddForm from "../assets/components/AddForm";
import RegisterForm from "../assets/components/RegisterForm";

import "../App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  redirect,
} from "react-router-dom";
import Layout from "../assets/components/Layout";
import Category from "../assets/components/Category";
import EditForm from "../assets/components/EditForm";
import CategoryForm from "../assets/components/CategoryForm";
import EditCategoryForm from "../assets/components/EditCategoryForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: () => {
      if (!localStorage.getItem("accessToken")) {
        throw redirect("/login");
      } 
      return null
    },
    children: [
      {
        path: "/",
        element: <Table />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/edit/:foodId",
        element: <EditForm />,
      },
      {
        path: "/add",
        element: <AddForm />,
      },
      {
        path: "/category/add",
        element: <CategoryForm />,
      },
      {
        path: "/edit/category/:categoryId",
        element: <EditCategoryForm />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
    loader: () => {
      console.log("here");
      if (localStorage.getItem("accessToken")) {
        throw redirect("/");
      }
      return null
    },
  },
]);

export default router;
