import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { getProducts } from "../redux/actions/productActions";
import MetaData from "./layout/MetaData";
import ProductCard from "./product/ProductCard";
import Loader from "./layout/Loader";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  // filter
  const { keyword } = useParams();
  const [price, setPrice] = useState([1, 99999999]);

  const { loading, error, products, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, alert, error, currentPage, keyword, price]);

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
              {keyword ? (
                <>
                  <div className=" col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          0: `Rp 0`,
                          99999999: `Rp 99999999`,
                        }}
                        min={0}
                        max={99999999}
                        value={price}
                        defaultValue={[0, 99999999]}
                        tipFormatter={(value) => `Rp${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        onChange={(price) => setPrice(price)}
                      />
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} col={3} />
                ))
              )}
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
