import React from "react";
import { createBrowserRouter  } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import UploadPage from "../pages/Upload";
import About from "../pages/About";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/about",
                element:<About/>
            },
            {
                path: "/upload",
                element: <UploadPage/>
            },
        ] 
    }
])

export default router;