import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./App.css";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product/:id" exact element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
