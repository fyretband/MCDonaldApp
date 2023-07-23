import "./App.css";
import Header from "./components/Navbar";
import Card from "./components/Card";
import Footer from "./components/Footer";
import BannerCarousel from "./components/BannerCarousel";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
