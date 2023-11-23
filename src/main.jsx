import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routers from "./Routers/Routers.jsx";
import Provider from "./Components/Provider/Provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={Routers}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
