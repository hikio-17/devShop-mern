import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { getProducts } from "../redux/actions/productActions";
import MetaData from "./layout/MetaData";
import ProductCard from "./product/ProductCard";
import Loader from "./layout/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();

  const { loading, error, products, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, alert, error, currentPage, keyword]);

  const setCurrentPageNo = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <MetaData title={"Buy Best Products Online"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="container container-fluid">
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </section>
        </div>
      )}
      {resPerPage <= productsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemCountPerPage={resPerPage}
            totalItemsCount={20}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            hideFirstLastPages={true}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
