import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routers from "./Routers/Routers.jsx";
import Provider from "./Components/Provider/Provider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={Routers}></RouterProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
