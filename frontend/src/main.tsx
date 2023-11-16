import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// w tym miejscu będzie trzeba zrobić routing do różnych komponentów aplikacji
// np. do wyszukiwarki gier, gry, do lobby, do ekranu logowania, etc.
// najlepiej przy użyciu react-router-dom

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
