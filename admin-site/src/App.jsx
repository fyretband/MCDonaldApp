import { useState } from "react";
import "./App.css";
import router from "./routes";
import { RouterProvider } from "react-router";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRouter from "./routes";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
   
    </Provider>
  );
}

export default App;
