import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);
export default router;
