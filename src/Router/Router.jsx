import { createBrowserRouter } from "react-router";

import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddReview from "../Pages/AddReview";
import ReviewDetails from "../Pages/ReviewDetails";
import AllReviews from "../Pages/AllReviews";
import NotFound from "../Pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import MyReviews from "../Pages/MyReviews";
import EditReview from "../Pages/EditReview";
import MyFavorites from "../Pages/MyFavorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-reviews",
        Component: AllReviews,
      },

      {
        path: "/reviews/:id",
        Component: ReviewDetails,
      },
      {
        path: "/add-review",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-review/:id",
        element: (
          <PrivateRoute>
            <EditReview></EditReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
            <MyFavorites></MyFavorites>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
