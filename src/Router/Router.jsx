import { createBrowserRouter } from "react-router";
// import NotFound from "../Pages/NotFound";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
// import Login from "../Pages/Login";

 
export const router=createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>,
                loader: async () => {
          const [slidersRes, reviewsRes] = await Promise.all([
            fetch("http://localhost:3000/sliders"),
            fetch("http://localhost:3000/reviews")
          ]);
          const sliders = await slidersRes.json();
          const reviews = await reviewsRes.json();
          return { sliders, reviews };
        }
            },


            {
                path:"/login",
                Component:Login
            },
            {
                path:"/register",
                Component:Register
            },
        ]
    }
])