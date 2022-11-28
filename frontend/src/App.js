import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./App.css";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" exact component={ProductDetails} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
