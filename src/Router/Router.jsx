const { createBrowserRouter } = require("react-router");
const { default: MainLayout } = require("./Layout/MainLayout");

 
export const router=createBrowserRouter([
    {
        path:"/",
        Component:MainLayout ,
    }
])