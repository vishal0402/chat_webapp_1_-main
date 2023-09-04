import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, persistedStore } from "./Redux/Store/Store";

ReactDOM.render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
