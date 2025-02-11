import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home_Page from "../pages/Home_Page";
import Restaurant_Page from "../pages/Restaurant_Page";
import Order_Overview_Page from "../pages/Order_Overview_Page";
import Order_Confirm_Page from "../pages/Order_Confirm_Page";
import Order_History from "../pages/Order_History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home_Page /> },
      { path: "restaurant/:id", element: <Restaurant_Page /> },
      {
        path: "restaurant/:id/queryItem/:itemId",
        element: <Restaurant_Page />,
      },
      { path: "order-overview/:id", element: <Order_Overview_Page /> },
      { path: "order-confirm/:orderId", element: <Order_Confirm_Page /> },
      { path: "orders", element: <Order_History /> },
    ],
  },
]);

export default router;
