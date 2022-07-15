import React, { useState, useEffect } from "react";

import {
  getCustomProjectsNetsuite,
  upsertCustomProjectsNetsuite,
  removeCustomProjectsNetsuite,
} from "../../actions/admin";

import { useSelector, useDispatch } from "react-redux";
import fuzzysort from "fuzzysort";

import NoImage from "../../assets/img/unavailable.svg";
import EditIcon from "../../assets/img/Account/edit-icon.svg";
import DeleteIcon from "../../assets/img/Account/delete-icon.svg";

const initialState = {
  price: "",
  productId: "",
};

export const CustomPrice = ({ mainCompany }) => {
  const admin = useSelector((state) => state.admin);
  const productsData = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [filterCustomPrice, setFilterCustomPrice] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [actionType, setActionType] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSubmit = () => {
    setActionLoading(true);
    dispatch(upsertCustomProjectsNetsuite(mainCompany.username, formData));
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove custom price for this product?") == true) {
      setFormData({ ...formData, productId: id });
      setActionType("delete");
      setActionLoading(true);
      let payload = { productId: id };
      dispatch(removeCustomProjectsNetsuite(mainCompany.username, payload));
    }
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
    let products, searchResult;

    products = productsData.productsv2 && productsData.productsv2.map((prod, key) => {
      let customIndex = admin.customProductNetsuite.findIndex(
        (custom) => custom.item.id === prod.id.toString()
      );

      if (customIndex !== -1) {
        return {
          ...prod,
          id: prod.id.toString(),
          customPrice: admin.customProductNetsuite[customIndex].price,
        };
      }

      return { ...prod, id: prod.id.toString() };
    });

    if (filterCustomPrice) {
      products = products.filter((prod) => prod.customPrice);
    }

    searchResult = fuzzysort.go(search, products, {
      keys: ["id", "name", "ndc", "productNumber"],
      all: true,
    });

    setFilteredProducts(searchResult);
  }, [search, admin, filterCustomPrice]);

  useEffect(() => {
    if (actionLoading && !admin.upsertError) {
      handleAlert("Adding/updating custom price successfully!", "success");
    }
    if (admin.upsertError) {
      handleAlert(
        "Error adding/updating custom price. Try again later!",
        "error"
      );
    }
    if (admin.removeCustomError) {
      handleAlert("Error deleting custom price. Try again later!", "error");
    }
    setFormData(initialState);
    setActionLoading(false);
  }, [admin]);

  useEffect(() => {
    mainCompany && dispatch(getCustomProjectsNetsuite(mainCompany.username));
  }, [mainCompany]);

  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between mt-4 mb-4 header">
          <h2 className="m-0">All Products</h2>
          <div className="w-50 filter-container d-flex align-items-center">
            <div className="search-container input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Search
                </span>
              </div>
              <input
                className="form-control"
                type="text"
                name="search"
                value={search}
                placeholder="id/name/ndc/product number"
                onChange={handleSearchChange}
                autoComplete="off"
              />
            </div>
            <div class="custom-control custom-switch no-wrap ml-5">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch2"
                checked={filterCustomPrice}
                onChange={(e) => setFilterCustomPrice(e.target.checked)}
              />
              <label className="custom-control-label" htmlFor="customSwitch2">
                Filter with custom price
              </label>
            </div>
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
                <th scope="col">
                  Price <br /> PPU
                </th>
                <th scope="col">Custom Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={`product${index}`}>
                  <td>
                    <img
                      width={40}
                      src={product.obj.url ? product.obj.url : NoImage}
                      alt=""
                    />
                  </td>
                  <td>
                    {product.obj.productNumber} <br /> {product.obj.ndc}
                  </td>
                  <td>{product.obj.name}</td>
                  <td>{product.obj.manufacturer}</td>
                  <td>{product.obj.bottleSize}</td>
                  <td>{product.obj.drugStrength}</td>
                  <td>
                    ${formatPrice(product.obj.cost)} <br />
                    {getPricePerUnit(product.obj.bottleSize, product.obj.cost)}
                  </td>
                  <td>
                    {product.obj.id === formData.productId &&
                    actionType === "edit" ? (
                      <>
                        <input
                          className="form-control mb-2"
                          type="text"
                          name="price"
                          value={formData.price}
                          placeholder=""
                          onChange={handleChange}
                          autoComplete="off"
                          disabled={actionLoading}
                        />
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            className="btn btn-link"
                            onClick={() => handleSubmit()}
                            disabled={actionLoading}
                          >
                            {actionLoading ? (
                              <div
                                className="spinner-border text-primary spinner-border-sm"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              "Save"
                            )}
                          </button>
                          <button
                            className="btn btn-link ml-2"
                            onClick={() => {
                              setActionType("");
                              setFormData({
                                ...formData,
                                productId: "",
                                price: "",
                              });
                            }}
                            disabled={actionLoading}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="d-flex align-items-center justify-content-between">
                        {product.obj.customPrice &&
                          `$${product.obj.customPrice}`}
                        <div className="d-flex align-items-center ml-2">
                          <button
                            className="btn btn-link "
                            onClick={() => {
                              setActionType("edit");
                              setFormData({
                                ...formData,
                                productId: product.obj.id,
                                price: product.obj.customPrice || "0",
                              });
                            }}
                            disabled={actionLoading}
                          >
                            {product.obj.customPrice ? (
                              <img
                                className="edit-icon"
                                src={EditIcon}
                                alt=""
                              />
                            ) : (
                              "Add"
                            )}
                          </button>
                          {product.obj.customPrice && (
                            <button
                              className="btn btn-link ml-2"
                              onClick={() => handleDelete(product.obj.id)}
                              disabled={actionLoading}
                            >
                              {actionLoading &&
                              actionType === "delete" &&
                              product.obj.id === formData.productId ? (
                                <div
                                  className="spinner-border text-danger spinner-border-sm ml-2"
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              ) : (
                                <img
                                  className="delete-icon"
                                  src={DeleteIcon}
                                  alt=""
                                />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
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
    </>
  );
};
