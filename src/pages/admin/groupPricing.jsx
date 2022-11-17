import React, { useState, useEffect } from "react";

import {
  getGroupPricing,
  createGroupPricing,
  addGroupPricingProduct,
  editGroupPricingProduct,
  deleteGroupPricingProduct,
} from "../../actions/admin";

import { useSelector, useDispatch } from "react-redux";
import fuzzysort from "fuzzysort";

const initialState = {
  product: null,
  newPrice: 0,
};

export default (props) => {
  const admin = useSelector((state) => state.admin);
  const productsData = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [actionType, setActionType] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const selectProduct = (product) => {
    const selectedProduct = {
      ndc: product.ndc,
      productId: product.id,
      productName: product.name,
      price: product.cost,
    };
    setFormData({
      product: selectedProduct,
      newPrice: product.cost,
    });
    setSearch(product.name);
  };

  const handleAddProduct = (groupId) => {
    const productToAdd = {
      ...formData.product,
      productId: parseInt(formData.product.productId),
      price: parseFloat(formData.newPrice),
    };
    dispatch(addGroupPricingProduct(groupId, productToAdd));
  };

  useEffect(() => {
    if (productsData.adminProducts) {
      let products, searchResult, changeTimer;

      changeTimer = setTimeout(() => {
        products = productsData.adminProducts.map((prod, key) => {
          return { ...prod, id: prod.id.toString() };
        });

        searchResult = fuzzysort.go(search, products, {
          keys: ["id", "name", "ndc"],
          all: true,
        });

        searchResult = searchResult.sort(function (a, b) {
          return a.obj.name > b.obj.name
            ? 1
            : a.obj.name === b.obj.name
            ? 0
            : -1;
        });

        setFilteredProducts(searchResult);
      }, 1000);

      return () => {
        clearTimeout(changeTimer);
      };
    }
  }, [search, productsData]);

  useEffect(() => {
    setFormData(initialState);
    setSearch("");
    setActionType("");
    setSelectedProduct(null);
    setActionLoading(false);
    setNewGroupName("");
  }, [admin]);

  useEffect(() => {
    dispatch(getGroupPricing());
  }, []);

  return (
    <div className="card">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Group Pricing</h2>
      </div>
      <div className="row">
        <div className="col-3">
          <div className="d-flex flex-column h-100">
            <nav
              className="nav nav-pills flex-column mb-3"
              style={{
                flex: "auto",
                overflow: "auto",
                maxHeight: "calc(100vh - 321px)",
                flexWrap: "nowrap",
              }}
            >
              {admin.groupPricingList.map((group, index) => (
                <a
                  key={`group${index}`}
                  data-toggle="pill"
                  className={"nav-link " + (index === 0 ? "active" : "")}
                  href={`#group${index}`}
                >
                  {group.name}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <input
                className="form-control"
                type="text"
                placeholder="Group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <button
                className="btn btn-primary w-100 mt-3"
                disabled={newGroupName === ""}
                onClick={() => {
                  const newGroupData = {
                    name: newGroupName,
                    pricingList: [],
                  };
                  dispatch(createGroupPricing(newGroupData));
                }}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="tab-content">
            {admin.groupPricingList.map((group, index) => (
              <div
                key={`groupData${index}`}
                id={`group${index}`}
                className={
                  "tab-pane fade " + (index === 0 ? "in active show" : "")
                }
              >
                <h3>{group.name}</h3>
                <div className="pricing-group-table">
                  <table className="table table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th className="no-wrap" scope="col">
                          Product Name
                        </th>
                        <th className="no-wrap" scope="col">
                          Product ID
                        </th>
                        <th scope="col">NDC</th>
                        <th scope="col">Price</th>
                        <th className="no-wrap" scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.pricingList.map((product, productIndex) => (
                        <tr key={`product${index}${productIndex}`}>
                          <td>{product.productName}</td>
                          <td>{product.productId}</td>
                          <td className="no-wrap">{product.ndc}</td>
                          <td>
                            {actionType === "edit" &&
                            selectedProduct?.productId === product.productId ? (
                              <input
                                className="form-control"
                                type="number"
                                placeholder="price"
                                value={selectedProduct.price}
                                onChange={(e) =>
                                  setSelectedProduct({
                                    ...selectedProduct,
                                    price: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              product.price
                            )}
                          </td>
                          <td className="no-wrap">
                            {actionType === "edit" &&
                            selectedProduct?.productId === product.productId ? (
                              <>
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setActionType("");
                                    setSelectedProduct(null);
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-success ml-2"
                                  style={{ minWidth: "50px" }}
                                  onClick={() => {
                                    setActionLoading(true);
                                    dispatch(
                                      editGroupPricingProduct(
                                        group.id,
                                        product.productId,
                                        {
                                          ...selectedProduct,
                                          price: parseFloat(
                                            selectedProduct.price
                                          ),
                                        }
                                      )
                                    );
                                  }}
                                  disabled={
                                    !selectedProduct ||
                                    selectedProduct?.price < 1
                                  }
                                >
                                  Save
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setActionType("edit");
                                    setSelectedProduct(product);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger ml-2"
                                  onClick={() => {
                                    setActionType("delete");
                                    setSelectedProduct(product);
                                    setActionLoading(true);
                                    dispatch(
                                      deleteGroupPricingProduct(
                                        group.id,
                                        product.productId
                                      )
                                    );
                                  }}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex align-items-end justify-content-between add-pricing-group">
                  <div className="position-relative group-search-product w-75">
                    <label>Product</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder={
                        productsData.adminProducts
                          ? "product"
                          : "loading products..."
                      }
                      value={search}
                      onChange={handleSearchChange}
                      disabled={!productsData.adminProducts}
                    />
                    <div
                      className="product-list-container list-group list-group-flush card position-absolute m-0 w-100 px-0 py-3"
                      style={{
                        minHeight: "calc(100vh - 500px)",
                        maxHeight: "calc(100vh - 500px)",
                        overflow: "auto",
                      }}
                    >
                      {filteredProducts.map((productData, productDataIndex) => (
                        <a
                          href="#"
                          className={
                            "list-group-item list-group-item-action px-3 " +
                            (formData.product?.productId === productData.obj.id
                              ? "active"
                              : "")
                          }
                          key={`productList${index}${productDataIndex}`}
                          onClick={() => selectProduct(productData.obj)}
                        >
                          {productData.obj.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="w-50">
                    <label>Price</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="price"
                      name="newPrice"
                      value={formData.newPrice}
                      onChange={handleChange}
                      disabled={!productsData.adminProducts}
                    />
                  </div>

                  <button
                    className="btn btn-primary w-50"
                    onClick={() => handleAddProduct(group.id)}
                    disabled={!formData.product || formData.newPrice < 1}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
