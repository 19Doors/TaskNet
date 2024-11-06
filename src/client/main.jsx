import "./index.css";
import Homepage from "./unauth/homepage.jsx";
import HomepageAuth from "./homepage.jsx"
import {SignUpP, SignInP} from "./unauth/auth.jsx";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/signin",
    element: <SignInP />,
  },
  {
    path: "/signup",
    element: <SignUpP />
  },
  {
    path: "/homepage",
    element: <HomepageAuth />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode>
  <RouterProvider router={router} /></React.StrictMode>);
