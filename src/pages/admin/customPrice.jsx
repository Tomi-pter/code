import React, { useState, useEffect } from "react";

import {
  getCustomProjectsNetsuite,
  upsertCustomProjectsNetsuite,
  removeCustomProjectsNetsuite,
} from "../../actions/admin";

import { useSelector, useDispatch } from "react-redux";
import fuzzysort from "fuzzysort";

import NoImage from "../../assets/img/unavailable.svg";

const initialState = {
  price: "",
  productId: "",
};

export const CustomPrice = ({ mainCompany }) => {
  const admin = useSelector((state) => state.admin);
  const productsData = useSelector((state) => state.products);
  const [search, setSearch] = useState({
    ndc: "",
    id: "",
  });
  const [filterProducts, setFilterProducts] = useState([]);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [actionType, setActionType] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isDisabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    e.target.value !== "" ? setOpenSuggestion(true) : setOpenSuggestion(false);
    setSearch({ ...search, ndc: e.target.value });
  };

  const handleSubmit = () => {
    setActionLoading(true);
    dispatch(upsertCustomProjectsNetsuite(mainCompany.username, formData));
  };

  const handleDelete = (id) => {
    setActionType("delete");
    setActionLoading(true);
    setFormData({ ...formData, productId: id });
    let payload = { productId: id };
    dispatch(removeCustomProjectsNetsuite(mainCompany.username, payload));
  };

  const handleSelectProduct = (product) => {
    setFormData({ ...formData, productId: product.id });
    setSearch({ ...search, ndc: product.ndc, id: product.id });
    setFilterProducts([]);
    setOpenSuggestion(false);
  };

  const handleAlert = (msg, type) => {
    setErrorMsg(msg);
    setShowError(true);
    setAlertType(type);
    setTimeout(function () {
      setShowError(false);
    }, 3000);
  };

  const formatPrice = (price) => {
    var n = parseFloat(price).toFixed(2);
    return n;
  };

  const getIntegerInStringArray = (string) => {
    return string.match(/[0-9\.,]+/g);
  };

  const roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
  };

  const getPricePerUnit = (bottleSize, cost) => {
    if (!bottleSize) {
      return "";
    }

    const sizeInString = getIntegerInStringArray(bottleSize);

    if (!sizeInString || sizeInString.length !== 1 || cost === 0) {
      return "";
    }

    const ppu = roundToTwo(cost / sizeInString);

    return `$ ${ppu}`;
  };

  useEffect(() => {
    let products, searchResult, changeTimer;

    if (search.ndc !== "") {
      changeTimer = setTimeout(() => {
        products = productsData.productsv2.map((prod, key) => {
          return { ...prod, id: prod.id.toString() };
        });

        searchResult = fuzzysort.go(search.ndc, products, {
          keys: ["id", "name", "ndc"],
        });

        setFilterProducts(searchResult);
      }, 1000);
    }

    return () => {
      clearTimeout(changeTimer);
    };
  }, [search]);

  useEffect(() => {
    const { price, productId } = formData;
    price !== "" && productId !== "" ? setDisabled(false) : setDisabled(true);
  }, [formData]);

  useEffect(() => {
    if (actionLoading && !admin.upsertError) {
      document.getElementById("closeCustomPriceModal").click();
      setFormData(initialState);
      setSearch({ ...search, id: "" });
    }
    if (admin.removeCustomError) {
      handleAlert("Error deleting custom price. Try again later!", "error");
    }
    setActionLoading(false);
  }, [admin]);

  useEffect(() => {
    mainCompany && dispatch(getCustomProjectsNetsuite(mainCompany.username));
  }, [mainCompany]);

  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between mt-4 mb-4 header">
          <h2 className="m-0"></h2>
          <div>
            <button
              type="button"
              className="btn btn-primary mr-3"
              data-toggle="modal"
              data-target="#customProductPriceModal"
            >
              View Custom Prices
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#customPriceModal"
              onClick={() => {
                setActionType("add");
                setFormData(initialState);
              }}
            >
              Add/Update Custom Price
            </button>
          </div>
        </div>
        <div className="table-container custom">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col">
                  Item # <br /> NDC
                </th>
                <th scope="col">Name</th>
                <th scope="col">Manufacturer</th>
                <th scope="col">Size</th>
                <th scope="col">Strength</th>
                <th scope="col">Price</th>
                <th scope="col">PPU</th>
              </tr>
            </thead>
            <tbody>
              {productsData.productsv2.map((product, index) => (
                <tr key={`product${index}`}>
                  <td>
                    <img
                      width={65}
                      src={product.url ? product.url : NoImage}
                      alt=""
                    />
                  </td>
                  <td>
                    {product.productNumber} <br /> {product.ndc}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.manufacturer}</td>
                  <td>{product.bottleSize}</td>
                  <td>{product.drugStrength}</td>
                  <td>${formatPrice(product.cost)}</td>
                  <td>{getPricePerUnit(product.bottleSize, product.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        id="toast"
        className={
          "toast alert " +
          (alertType === "error" ? "alert-danger " : "alert-success ") +
          (showError ? "show" : "")
        }
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-delay="2000"
        style={{ position: "fixed", bottom: "1rem", right: "1rem" }}
      >
        {errorMsg}
      </div>
      <div
        className="modal fade"
        id="customPriceModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="userTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userTitle">
                Add/Update Custom Price
              </h5>
              <button
                id="closeCustomPriceModal"
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="productId">NDC</label>
                    <input
                      type="text"
                      name="productId"
                      value={search.ndc}
                      className="form-control"
                      id="productId"
                      onChange={handleSearchChange}
                    />
                    {filterProducts.length > 0 && openSuggestion && (
                      <div className="suggestions-container">
                        <ul className="list-group">
                          {filterProducts.map((product, key) => {
                            return (
                              <li
                                key={`product${key}`}
                                className="list-group-item"
                                onClick={() => handleSelectProduct(product.obj)}
                              >
                                {`${product.obj.ndc} - ${product.obj.name}`}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      className="form-control"
                      id="price"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <p className="text-danger text-small error-msg mb-3 ">
                    {admin.upsertError &&
                      "Error adding/updating custom price. Try again later!"}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary d-flex align-items-center justify-content-center w-100"
                    onClick={handleSubmit}
                    disabled={isDisabled || actionLoading}
                  >
                    {actionLoading && (
                      <div
                        className="spinner-border text-light spinner-border-sm mr-3"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    {actionType === "edit" ? "Save" : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="customProductPriceModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="userTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userTitle">
                Custom Prices
              </h5>
              <button
                id="closeCustomProductPriceModal"
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="table-container">
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Price</th>
                      {/* <th scope="col">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {admin.customProductNetsuite.map((product, index) => (
                      <tr key={`customproduct${index}`}>
                        <td>{product.item.id}</td>
                        <td>${product.price}</td>
                        {/* <td>
                          <button
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#customPriceModal"
                            onClick={() => {
                              setActionType("edit");
                              setFormData({
                                ...formData,
                                price: product.price,
                                productId: product.item.id,
                              });
                              setSearch({
                                ...search,
                                id: product.item.id,
                              });
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ml-4"
                            disabled={actionLoading}
                            onClick={() => handleDelete(product.item.id)}
                          >
                            {actionLoading &&
                            formData.productId === product.item.id &&
                            actionType === "delete" ? (
                              <div
                                className="spinner-border text-light spinner-border-sm"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
