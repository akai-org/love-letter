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
import BrowserPage from "./Pages/BrowserPage.tsx";
import LobbyPage from "./Pages/LobbyPage.tsx";
import GamePage from "./Pages/GamePage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<BrowserPage />} />
      <Route path="/lobby" element={<LobbyPage />} />
      <Route path="/game/:roomID/:clientID" element={<GamePage />} loader={GamePageLoader} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export function GamePageLoader({ params }: { params: Params<string> }) {
  return { roomID: params.roomID, clientID: params.clientID };
}
