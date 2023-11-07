import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import React from "react";
import router from "./router";

ReactDOM.hydrateRoot(
  document.getElementById("app")!,
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
console.log("hydrated");
