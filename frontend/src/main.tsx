import React from "react";
import ReactDOM from "react-dom/client";
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import BrowserPage from "./Pages/BrowserPage.tsx";
import LobbyPage from "./Pages/LobbyPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<BrowserPage />} />
      <Route path="/lobby" element={<LobbyPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
