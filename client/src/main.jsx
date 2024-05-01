import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import Socket from "./utils/Socket.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <Socket />
      <App />
    </Provider>
  </>
);
