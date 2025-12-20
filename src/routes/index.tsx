import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CategoryPage from "../pages/CategoryPage";


const router = createBrowserRouter( [

    {path: "/", element: <App />},
    {path: "/news/:slug", element: <CategoryPage/>}
])