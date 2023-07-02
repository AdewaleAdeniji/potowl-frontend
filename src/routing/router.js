import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import FormPage from "../pages/customer";
import OTPPage from "../pages/customer/OtpPage";
import AdminPage from "../pages/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FormPage />,
  },
  {
    path: ":phone/otp-code",
    element: <OTPPage />,
  },
  {
    path: `/manage/:key`,
    element: <AdminPage />,
  },
]);
export default router;
