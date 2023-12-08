import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Params,
} from "react-router-dom";
import "./index.css";
import BrowserPage from "./Pages/BrowserPage/BrowserPage.tsx";
import RoomPage from "./Pages/RoomPage/RoomPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<BrowserPage />} />
      <Route path="/game/:roomID/:clientID" loader={RoomPageLoader} element={<RoomPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export function RoomPageLoader({ params }: { params: Params<string> }) {
  return { roomID: params.roomID, clientID: params.clientID };
}
