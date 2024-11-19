import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home_Page from "../pages/Home_Page";
import Restaurant_Page from "../pages/Restaurant_Page";
import Order_Overview_Page from "../pages/Order_Overview_Page";
import Order_Confirm_Page from "../pages/Order_Confirm_Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home_Page /> },
      { path: "restaurant/:id", element: <Restaurant_Page /> },
      { path: "order-overview", element: <Order_Overview_Page /> },
      { path: "order-confirm", element: <Order_Confirm_Page /> },
    ],
  },
]);

export default router;
