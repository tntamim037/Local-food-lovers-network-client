import { createBrowserRouter } from "react-router";
import MainLayout from "../src/Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
  },
]);
