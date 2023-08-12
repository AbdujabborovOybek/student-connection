import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import "./Assets/Global.css";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./Context/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);
