import React, { useState, useEffect } from "react";

import {
  addGroupPricingProduct,
  editGroupPricingProduct,
  deleteGroupPricingProduct,
  addGroupPricingUser,
  removeGroupPricingUser,
} from "../../actions/admin";

import { useSelector, useDispatch } from "react-redux";
import fuzzysort from "fuzzysort";

const initialState = {
  product: null,
  newPrice: 0,
};

export const Group = ({ group, index }) => {
  const admin = useSelector((state) => state.admin);
  const productsData = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [actionType, setActionType] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchUserChange = (e) => {
    setSearchUser(e.target.value);
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

  const selectUser = (user) => {
    const selectedUser = {
      company: user.company,
      email: user.email,
      username: user.username,
    };

    setSelectedUser(selectedUser);
    setSearchUser(user.company);
  };

  const handleAddUser = (groupId) => {
    dispatch(addGroupPricingUser(selectedUser, groupId));
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
    if (admin.users) {
      let users, searchResult, changeTimer;

      changeTimer = setTimeout(() => {
        users = admin.users.filter((u) => u.subAccount === false);

        searchResult = fuzzysort.go(searchUser, users, {
          keys: ["company", "email"],
          all: true,
        });

        searchResult = searchResult.sort(function (a, b) {
          return a.obj.company > b.obj.company
            ? 1
            : a.obj.company === b.obj.company
            ? 0
            : -1;
        });

        setFilteredUsers(searchResult);
      }, 1000);

      return () => {
        clearTimeout(changeTimer);
      };
    }
  }, [searchUser, admin]);

  useEffect(() => {
    setFormData(initialState);
    setSearch("");
    setActionType("");
    setSelectedProduct(null);
    setActionLoading(false);
    setSelectedUser(null);
    setSearchUser("");
  }, [admin]);

  return (
    <div
      key={`groupData${index}`}
      id={`group${index}`}
      className={"tab-pane fade " + (index === 0 ? "in active show" : "")}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">{group.name}</h3>
        <nav className="nav nav-pills">
          <a
            data-toggle="pill"
            className="nav-link active"
            href={`#groupProducts${index}`}
          >
            Products
          </a>
          <a
            data-toggle="pill"
            className="nav-link"
            href={`#groupUsers${index}`}
          >
            Users
          </a>
        </nav>
      </div>
      <div className="tab-content">
        <div
          className="tab-pane fade in active show"
          id={`groupProducts${index}`}
        >
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
                                    price: parseFloat(selectedProduct.price),
                                  }
                                )
                              );
                            }}
                            disabled={
                              !selectedProduct || selectedProduct?.price < 1
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
                  productsData.adminProducts ? "product" : "loading products..."
                }
                value={search}
                onChange={handleSearchChange}
                disabled={!productsData.adminProducts}
              />
              <div
                className="product-list-container list-group list-group-flush card position-absolute m-0 w-100 px-0 py-3"
                style={{
                  minHeight: "max-content",
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
        <div className="tab-pane fade" id={`groupUsers${index}`}>
          <div className="pricing-group-table">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th className="no-wrap" scope="col">
                    User Name
                  </th>
                  <th className="no-wrap" scope="col">
                    Email
                  </th>
                  <th className="no-wrap" scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {admin.users
                  .filter(
                    (u) =>
                      u.groupPricingId && u.groupPricingId.includes(group.id)
                  )
                  .map((user, userIndex) => (
                    <tr key={`groupUser${index}${userIndex}`}>
                      <td>{user.company}</td>
                      <td>{user.email}</td>
                      <td className="no-wrap">
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            dispatch(
                              removeGroupPricingUser(user, user.groupPricingId)
                            );
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex align-items-end justify-content-between add-pricing-group">
            <div className="position-relative group-search-product w-75">
              <label>User</label>
              <input
                className="form-control"
                type="text"
                placeholder={admin.users ? "user" : "loading users..."}
                value={searchUser}
                onChange={handleSearchUserChange}
                disabled={!admin.users}
              />
              <div
                className="product-list-container list-group list-group-flush card position-absolute m-0 w-100 px-0 py-3"
                style={{
                  minHeight: "max-content",
                  maxHeight: "calc(100vh - 500px)",
                  overflow: "auto",
                }}
              >
                {filteredUsers.map((userData, userDataIndex) => (
                  <a
                    href="#"
                    className={
                      "list-group-item list-group-item-action px-3 " +
                      (selectedUser &&
                      selectedUser.username === userData.obj.username
                        ? "active"
                        : "")
                    }
                    key={`user${index}${userDataIndex}`}
                    onClick={() => selectUser(userData.obj)}
                  >
                    {userData.obj.company}
                  </a>
                ))}
              </div>
            </div>
            <button
              className="btn btn-primary w-50"
              onClick={() => handleAddUser(group.id)}
              disabled={!selectedUser}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
