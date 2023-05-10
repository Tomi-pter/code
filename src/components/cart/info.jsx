import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAccount,
  getAllAddresses,
  addAddresses,
  updateAddressesById,
  makeDefaultAddress,
  makeDefaultAddressBilling,
} from "../../actions/account";
import Edit from "../../assets/img/Account/edit-icon.svg";
import Input from "../shared/input";
import Dropdown from "../shared/dropdown";
import InputContact from "react-phone-number-input/input";
import {
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import { getCountries, getStates } from "../../actions/auth";

import ProfilePic from "../../assets/img/Account/placeholder-dp.svg";
import AddressIcon from "../../assets/img/address-icon.svg";
import StarIcon from "../../assets/img/star.svg";
import OptionsIcon from "../../assets/img/options.svg";

const initialFormData = {
  // givenName: "",
  // familyName: "",
  // email: "",
  mobileNumber: "",
  // address: "",
  address1: "",
  address2: "",
  company: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
  countryCode: "US",
};

export const CheckoutInfo = ({
  cart,
  selectedShipping,
  setSelectedShipping,
  selectedBilling,
  setSelectedBilling,
}) => {
  const account = useSelector((state) => state.account);
  const auth = useSelector((state) => state.auth);
  const [selectShipping, setSelectShipping] = useState(null);
  const [selectBilling, setSelectBilling] = useState(null);
  const [checked, setChecked] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [defaultAddressBilling, setDefaultAddressBilling] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDefaultSelected, setIsDefaultSelected] = useState(null);
  const [isDefaultLoading, setIsDefaultLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editAddress, setEditAddress] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isDisabled, setDisabled] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const dispatch = useDispatch();

  const handleSelect = (addressFor, address) => {
    if (addressFor === "shipping") {
      setSelectedShipping(address);
      if (checked) {
        setSelectBilling(address);
        setSelectedBilling(address);
      }

      document.getElementById("shippingBtn").click();
      if (!checked && !selectedBilling) {
        document.getElementById("billingBtn").click();
      }
    } else {
      setSelectedBilling(address);
      document.getElementById("billingBtn").click();
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("profile"));
    if (isEdit) {
      dispatch(updateAddressesById(user?.username, editAddress, formData));
    } else {
      dispatch(addAddresses(user?.username, formData));
    }
  };

  const handleAddAddress = () => {
    setIsEdit(false);
    // setStates([]);
    setFormData(initialFormData);
  };

  const handleEditAddress = (address) => {
    setIsEdit(true);
    // setStates([]);
    setFormData(address.details);
    setEditId(address.addressId);
    setEditAddress(address);
  };

  const handleMakeDefaultAddress = (address) => {
    setIsDefaultSelected(address);
    setIsDefaultLoading(true);
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(makeDefaultAddress(user?.username, address));
  };

  const handleMakeDefaultAddressBilling = (address) => {
    setIsDefaultSelected(address);
    setIsDefaultLoading(true);
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(makeDefaultAddressBilling(user?.username, address));
  };

  const contactChange = (value) => {
    setFormData({ ...formData, mobileNumber: value });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const shippingList = (type) => {
    if (type === "shipping") {
      // if (document.getElementById("infosCollapse").className.includes("show"))
      setSelectShipping(selectedShipping);
    } else {
      // if (document.getElementById("infosCollapse2").className.includes("show"))
      setSelectBilling(selectedBilling);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(getAccount(user?.username));
    dispatch(getAllAddresses(user?.username));
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(false);
    setIsDefaultLoading(false);
    setIsDefaultSelected(null);
    const isDefaultAddress = account?.addressesData?.find(
      (address) => address.isDefaultShipping === true
    );
    const isDefaultAddressBilling = account?.addressesData?.find(
      (address) => address.isDefaultBilling === true
    );
    setDefaultAddress(isDefaultAddress);
    setDefaultAddressBilling(isDefaultAddressBilling);

    if (cart?.checkoutDetail) {
      setSelectedShipping(cart?.checkoutDetail?.selectedShipping);
      setSelectShipping(cart?.checkoutDetail?.selectedShipping);
      setSelectedBilling(cart?.checkoutDetail?.selectedBilling);
      setSelectBilling(cart?.checkoutDetail?.selectedBilling);
      if (
        cart?.checkoutDetail?.selectedShipping?.addressId !==
        cart?.checkoutDetail?.selectedBilling?.addressId
      ) {
        setChecked(false);
      }
    } else {
      if (account?.addressesData.length === 1) {
        setSelectedShipping(account?.addressesData[0]);
        if (!selectShipping) setSelectShipping(account?.addressesData[0]);
        setSelectedBilling(account?.addressesData[0]);
        if (!selectBilling) setSelectBilling(account?.addressesData[0]);
      }
      // if (
      //   account?.addressesData.length > 1 &&
      //   !document.getElementById("infosCollapse").className.includes("show") &&
      //   !selectedShipping
      // ) {
      //   document.getElementById("shippingBtn").click();
      // }
    }
    setIsEdit(false);
    setEditId("");
    setEditAddress(null);
    // setStates([]);
    document.getElementById("closeAddressModal").click();
  }, [account]);

  useEffect(() => {
    if (checked === true) {
      setSelectBilling(selectedShipping);
      setSelectedBilling(selectedShipping);
    }
  }, [checked]);

  useEffect(() => {
    setCountries(auth?.countriesData);
    if (auth?.statesData?.length > 0) {
      setStates(auth?.statesData);
    } else {
      setStates([]);
      formData.state = "";
    }
  }, [auth]);

  useEffect(() => {
    if (formData.country !== "" && countries) {
      const selectedCountry = countries.filter(
        (e) => e.name === formData.country
      );
      if (selectedCountry.length > 0) {
        console.log(selectedCountry);
        const countryCode = selectedCountry[0]?.abbreviation;
        setFormData({ ...formData, countryCode });
        dispatch(getStates(countryCode));
      } else {
        setFormData({ ...formData, countryCode: "US" });
        dispatch(getStates("US"));
      }
    }
  }, [formData.country]);

  const validation = useCallback(() => {
    const phoneCheck =
      formatPhoneNumberIntl(formData.mobileNumber) &&
      isPossiblePhoneNumber(formData.mobileNumber)
        ? true
        : false;
    const checkState =
      formData.state === "" && states.length > 0 ? false : true;
    formData.mobileNumber !== "" &&
    phoneCheck &&
    formData.address1 !== "" &&
    formData.city !== "" &&
    formData.postalCode !== "" &&
    formData.country !== "" &&
    checkState
      ? setDisabled(false)
      : setDisabled(true);
  }, [formData, states]);

  useEffect(() => {
    validation();
  }, [validation]);

    return <>
        <div className='customer-info mb-4'>
            <div className='personal-info d-flex align-items-center'>
                <div className='profile-image-container mr-2'>
                    <img className="profilePic" src={ProfilePic} />
                </div>
                <div className='info-container d-flex flex-column'>
                    <h4>Omar Mike</h4>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center'>
                            <label>Email:</label>
                            <span>myusername@gmail.com</span>
                        </div>
                        <div className='divider'/>
                        <div className='d-flex align-items-center'>
                            <label>Phone:</label>
                            <span>+1234567890988</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='address-container d-flex flex-column justify-content-center'>
                <div className="title-container d-flex align-items-center justify-content-between">
                    <h2>Shipping Address</h2>
                    <button
                        className="main-edit-btn"
                        type="button"
                        id="shippingBtn"
                        data-toggle="collapse"
                        data-target=".shipping-address-container"
                        aria-expanded="false"
                        aria-controls="shippingSelected shippingList"
                        onClick={() => shippingList("shipping")}
                        style={{
                            display: `${!selectedShipping ? "none" : "block"}`
                        }}
                    >
                        <div className="edit-wrapper d-flex align-items-center justify-content-center">
                            <img src={Edit} alt="" />
                            <span>Edit Info</span>
                        </div>
                    </button>
                </div>

                {
                    account?.addressesData.length > 0
                        ? <>
                            <ul
                                id="shippingSelected"
                                className={
                                    "shipping-address-container info-list collapse " +
                                    (account?.addressesData.length === 1 ? "show" : "")
                                }
                            >
                                <li>
                                    <img
                                        src={require("../../assets/img/mdi_map-marker.svg")}
                                        alt=""
                                    />
                                    {
                                        selectedShipping
                                        && <span>
                                        {
                                            selectedShipping?.details?.address
                                            + " " +
                                            selectedShipping?.details?.city
                                            + " " +
                                            (selectedShipping?.details?.state || "")
                                            + " " +
                                            selectedShipping?.details?.postalCode
                                        }{" "}

                                        {
                                            defaultAddress?.addressId === selectedShipping?.addressId
                                            && <span className="default mr-3">Default</span>
                                        }

                                        {
                                            defaultAddressBilling?.addressId === selectedShipping?.addressId
                                            && <span className="default">Default Billing</span>
                                        }
                                        </span>
                                    }
                                </li>
                                <li>
                                    <img src={require("../../assets/img/mdi_phone.svg")} alt="" />
                                    {
                                        selectedShipping
                                        && <span>{selectedShipping?.details?.mobileNumber}</span>
                                    }
                                </li>
                            </ul>
                            <div
                                id="shippingList"
                                className={
                                    "shipping-address-container collapse " +
                                    (account?.addressesData.length > 1 ? "show" : "")
                                }
                            >
                                <div className='address-list mb-4'>
                                    {
                                        account?.addressesData?.map(address => <a
                                                key={`key-${address?.addressId}`}
                                                className={'address-item d-flex align-items-center justify-content-between col-12 '  + (
                                                    selectShipping
                                                    && selectShipping?.addressId === address?.addressId
                                                        ? "selected"
                                                        : ""
                                                )}
                                                onClick={() => setSelectShipping(address)}
                                            >
                                            <div className='address-icon d-flex align-items-center justify-content-center'>
                                                <img src={AddressIcon} alt='Address Icon'/>
                                            </div>
                                            <div className='address-details d-flex flex-column'>
                                                <p>{ address?.details?.address }</p>
                                                <p>{ address?.details?.mobileNumber }</p>
                                            </div>
                                            <div className="icon-container d-flex flex-column align-items-center">
                                                {
                                                    defaultAddress?.addressId === address?.addressId
                                                    && <div className='default-icon d-flex align-items-center justify-content-center'>
                                                        <img src={StarIcon} alt='Star Icon'/>
                                                        <span>Default</span>
                                                    </div>
                                                }

                                                {
                                                    defaultAddressBilling?.addressId === address?.addressId
                                                    && <div className='default-icon d-flex align-items-center justify-content-center'>
                                                        <img src={StarIcon} alt='Star Icon'/>
                                                        <span>Billing</span>
                                                    </div>
                                                }

                                                
                                            </div>
                                            <div className='options-icon d-flex align-items-center justify-content-center p-3'>
                                                <div class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                                        <span class="glyphicon glyphicon-option-vertical"></span>
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a
                                                                data-toggle="modal"
                                                                data-target="#addAddressModal"
                                                                onClick={() => handleEditAddress(address)}
                                                            >
                                                                Edit Address
                                                            </a>
                                                        </li>

                                                        {
                                                            address?.addressId
                                                            && defaultAddress?.addressId !== address?.addressId
                                                            && <li>
                                                                <a onClick={() => handleMakeDefaultAddress(address)}>
                                                                    {
                                                                        isDefaultLoading
                                                                        && isDefaultSelected?.addressId === address.addressId
                                                                            ? <div
                                                                                className="spinner-border text-success"
                                                                                role="status"
                                                                            >
                                                                                <span className="sr-only">Loading...</span>
                                                                            </div>
                                                                            : <>Set as Default</>
                                                                    }
                                                                </a>
                                                            </li>
                                                        }

                                                        {
                                                            defaultAddressBilling?.addressId !== address?.addressId
                                                            && <li>
                                                                <a onClick={() => handleMakeDefaultAddressBilling(address)}>
                                                                    {
                                                                        isDefaultLoading
                                                                        && isDefaultSelected?.addressId === address.addressId
                                                                            ? <div
                                                                                className="spinner-border text-success"
                                                                                role="status"
                                                                            >
                                                                                <span className="sr-only">Loading...</span>
                                                                            </div>
                                                                            : <>Set as Default Billing</>
                                                                    }
                                                                </a>
                                                            </li>

                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </a>)
                                    }
                                </div>
                                {/* <button
                                    className="add-btn"
                                    data-toggle="modal"
                                    data-target="#addAddressModal"
                                    onClick={() => handleAddAddress()}
                                >
                                    Add New Address
                                </button> */}
                                <div className="d-flex align-items-center justify-content-between">
                                    <button
                                        className="cancel-btn"
                                        onClick={() => {
                                            document.getElementById("shippingBtn").click();
                                        }}
                                        disabled={!selectShipping}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="save-btn"
                                        onClick={() => handleSelect("shipping", selectShipping)}
                                        disabled={!selectShipping}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </>
                        : <>{"Loading Address..."}</>
                }
            </div>

            <hr/>

            <div className='address-container d-flex flex-column justify-content-center'>
                <div className='title-container d-flex align-items-start justify-content-between'>
                    <h2>Billing Address</h2>
                    <button
                        className="main-edit-btn"
                        type="button"
                        id="billingBtn"
                        data-toggle="collapse"
                        data-target=".billing-address-container"
                        aria-expanded="false"
                        aria-controls="billingSelected billingList"
                        onClick={() => shippingList("billing")}
                        style={{
                            display: `${!selectedBilling ? "none" : "block"}`
                        }}
                    >
                        <div className="edit-wrapper d-flex align-items-center justify-content-center">
                            <img src={Edit} alt="" />
                            <span>Edit Info</span>
                        </div>
                    </button>
                </div>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="sameAddress"
                        name="sameAddress"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        disabled={!selectedShipping}
                    />
                    <label htmlFor="sameAddress">Same as shipping address</label>
                </div>
                {
                    !checked
                    && <>
                        <ul
                            id="billingSelected"
                            className="billing-address-container info-list show"
                        >
                            <li>
                                <img
                                    src={require("../../assets/img/mdi_map-marker.svg")}
                                    alt=""
                                />
                                {
                                    selectedBilling
                                    && <span>
                                        {
                                            selectedBilling?.details?.address
                                            + " " +
                                            selectedBilling?.details?.city
                                            + " " +
                                            (selectedBilling?.details?.state || "")
                                            + " " +
                                            selectedBilling?.details?.postalCode}{" "}

                                            {
                                                defaultAddress?.addressId === selectedBilling?.addressId
                                                && <span className="default mr-3">Default</span>
                                            }

                                            {
                                                defaultAddressBilling?.addressId === selectedBilling?.addressId
                                                && <span className="default">Default Billing</span>
                                            }
                                    </span>
                                }
                            </li>
                            <li>
                                <img src={require("../../assets/img/mdi_phone.svg")} alt="" />
                                {
                                    selectedBilling
                                    && <span>{selectedBilling?.details?.mobileNumber}</span>
                                }
                            </li>
                        </ul>

                        <div
                            className="billing-address-container collapse"
                            id="billingList"
                        >
                            <div className='address-list'>
                                {
                                    account?.addressesData?.map(address => <a
                                            key={`key-billing-${address?.addressId}`}
                                            className={'address-item d-flex align-items-center justify-content-between col-12 '  + (
                                                selectBilling
                                                && selectBilling?.addressId === address?.addressId
                                                    ? "selected"
                                                    : ""
                                            )}
                                            onClick={() => setSelectBilling(address)}
                                        >
                                        <div className='address-icon d-flex align-items-center justify-content-center'>
                                            <img src={AddressIcon} alt='Address Icon'/>
                                        </div>
                                        <div className='address-details d-flex flex-column'>
                                            <p>{ address?.details?.address }</p>
                                            <p>{ address?.details?.mobileNumber }</p>
                                        </div>
                                        <div className="icon-container d-flex flex-column align-items-center">
                                            {
                                                defaultAddress?.addressId === address?.addressId
                                                && <div className='default-icon d-flex align-items-center justify-content-center'>
                                                    <img src={StarIcon} alt='Star Icon'/>
                                                    <span>Default</span>
                                                </div>
                                            }

                                            {
                                                defaultAddressBilling?.addressId === address?.addressId
                                                && <div className='default-icon d-flex align-items-center justify-content-center'>
                                                    <img src={StarIcon} alt='Star Icon'/>
                                                    <span>Billing</span>
                                                </div>
                                            }
                                        </div>
                                        <div className='options-icon d-flex align-items-center justify-content-center p-3'>
                                            <div class="dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                                    <span class="glyphicon glyphicon-option-vertical"></span>
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li>
                                                        <a
                                                            data-toggle="modal"
                                                            data-target="#addAddressModal"
                                                            onClick={() => handleEditAddress(address)}
                                                        >
                                                            Edit Address
                                                        </a>
                                                    </li>

                                                    {
                                                        address?.addressId
                                                        && defaultAddress?.addressId !== address?.addressId
                                                        && <li>
                                                            <a onClick={() => handleMakeDefaultAddress(address)}>
                                                                {
                                                                    isDefaultLoading
                                                                    && isDefaultSelected?.addressId === address.addressId
                                                                        ? <div
                                                                            className="spinner-border text-success"
                                                                            role="status"
                                                                        >
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        : <>Set as Default</>
                                                                }
                                                            </a>
                                                        </li>
                                                    }

                                                    {
                                                        defaultAddressBilling?.addressId !== address?.addressId
                                                        && <li>
                                                            <a onClick={() => handleMakeDefaultAddressBilling(address)}>
                                                                {
                                                                    isDefaultLoading
                                                                    && isDefaultSelected?.addressId === address.addressId
                                                                        ? <div
                                                                            className="spinner-border text-success"
                                                                            role="status"
                                                                        >
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        : <>Set as Default Billing</>
                                                                }
                                                            </a>
                                                        </li>

                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </a>)
                                }
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        document.getElementById("billingBtn").click();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="save-btn"
                                    onClick={() => handleSelect("billing", selectBilling)}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>

        {/* <div className="customer-info">
            <div className="d-flex align-items-center justify-content-between title-container">
            <h1 className="title m-0">Shipping Address</h1>
            <button
                className="main-edit-btn"
                type="button"
                id="shippingBtn"
                data-toggle="collapse"
                data-target=".shipping-address-container"
                aria-expanded="false"
                aria-controls="shippingSelected shippingList"
                onClick={() => shippingList("shipping")}
                style={{
                    visibility: !selectedShipping ? "hidden" : "visible",
                    zIndex: !selectedShipping ? -1 : 0,
                }}
            >
                <img src={Edit} alt="" />
            </button>
            </div>
            {
                account?.addressesData.length > 0
                ? <>
                    <ul id="shippingSelected"
                        className={
                            "shipping-address-container info-list collapse " +
                            (account?.addressesData.length === 1 ? "show" : "")
                        }
                    >
                        <li>
                            <img
                                src={require("../../assets/img/mdi_map-marker.svg")}
                                alt=""
                            />
                            {
                                selectedShipping
                                && <span>
                                {
                                    selectedShipping?.details?.address
                                    + " " +
                                    selectedShipping?.details?.city
                                    + " " +
                                    (selectedShipping?.details?.state || "")
                                    + " " +
                                    selectedShipping?.details?.postalCode
                                }{" "}

                                {
                                    defaultAddress?.addressId === selectedShipping?.addressId
                                    && <span className="default mr-3">Default</span>
                                }

                                {
                                    defaultAddressBilling?.addressId === selectedShipping?.addressId
                                    && <span className="default">Default Billing</span>
                                }
                                </span>
                            }
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_phone.svg")} alt="" />
                            {
                                selectedShipping
                                && <span>{selectedShipping?.details?.mobileNumber}</span>
                            }
                        </li>
                    </ul>
                    <div
                        id="shippingList"
                        className={
                            "shipping-address-container collapse " +
                            (account?.addressesData.length > 1 ? "show" : "")
                        }
                    >
                        {!selectedShipping && <h3>Please select shipping address</h3>}

                        <ul className="infos-list">
                            {account?.addressesData?.map((item) => (
                            <li
                                key={`key-${item?.addressId}`}
                                onClick={() => setSelectShipping(item)}
                            >
                                <div
                                className={
                                    "indicator " +
                                    (
                                        selectShipping
                                        && selectShipping?.addressId === item?.addressId
                                            ? "active"
                                            : ""
                                    )
                                }
                                >
                                <div className="center"></div>
                                </div>
                                <div className="d-flex align-items-center info-container">
                                <div className="info">
                                    <p>
                                        {
                                            item.details?.address
                                            + " " +
                                            item.details?.city
                                            + " " +
                                            (item.details?.state || "")
                                            + " " +
                                            item.details?.postalCode
                                        }
                                    </p>
                                    <p>{item.details?.mobileNumber}</p>
                                    <div className="d-flex align-items-center name">
                                    {
                                        defaultAddress?.addressId === item?.addressId
                                        && <div className="default mr-3">Default</div>
                                    }
                                    {
                                        defaultAddressBilling?.addressId === item?.addressId
                                        && <div className="default">Default Billing</div>
                                    }
                                    </div>
                                    <div className="d-flex mt-3">
                                        {
                                            item?.addressId
                                            && defaultAddress?.addressId !== item?.addressId
                                            && <button
                                                className="default-btn mr-3"
                                                onClick={() => handleMakeDefaultAddress(item)}
                                            >
                                                {
                                                    isDefaultLoading
                                                    && isDefaultSelected.addressId === item.addressId
                                                        ? <div
                                                            className="spinner-border text-success"
                                                            role="status"
                                                        >
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                        : <>{"Set as Default"}</>
                                                }
                                            </button>
                                        }

                                        {
                                            item?.addressId
                                            && defaultAddressBilling?.addressId !== item?.addressId
                                            && <button
                                                className="default-btn"
                                                onClick={() => handleMakeDefaultAddressBilling(item)}
                                            >
                                                {
                                                    isDefaultLoading &&
                                                    isDefaultSelected.addressId ===
                                                    item.addressId
                                                        ? <div
                                                            className="spinner-border text-success"
                                                            role="status"
                                                        >
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                        : <>{"Set as Default Billing"}</>
                                                }
                                            </button>
                                        }
                                    </div>
                                </div>
                                <button
                                    className="edit-btn"
                                    data-toggle="modal"
                                    data-target="#addAddressModal"
                                    onClick={() => handleEditAddress(item)}
                                >
                                    Edit
                                </button>
                                </div>
                            </li>
                            ))}
                        </ul>
                        <button
                            className="add-btn"
                            data-toggle="modal"
                            data-target="#addAddressModal"
                            onClick={() => handleAddAddress()}
                        >
                            + Add New Address
                        </button>
                        <div className="d-flex align-items-center justify-content-between">
                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    document.getElementById("shippingBtn").click();
                                }}
                                disabled={!selectShipping}
                            >
                                Cancel
                            </button>
                            <button
                                className="save-btn"
                                onClick={() => handleSelect("shipping", selectShipping)}
                                disabled={!selectShipping}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </>
                : <>{"Loading Address..."}</>
            }
        </div>
        <div className="customer-info mb-4">
            <div className="d-flex align-items-center justify-content-between title-container m-0">
            <h1 className="title m-0">Billing Address</h1>
            <button
                className="main-edit-btn"
                type="button"
                id="billingBtn"
                data-toggle="collapse"
                data-target=".billing-address-container"
                aria-expanded="false"
                aria-controls="billingSelected billingList"
                onClick={() => shippingList("billing")}
                style={{
                visibility: checked ? "hidden" : "visible",
                zIndex: checked ? -1 : 0,
                }}
            >
                <img src={Edit} alt="" />
            </button>
            </div>
            <div className="checkbox-container">
            <input
                type="checkbox"
                id="sameAddress"
                name="sameAddress"
                checked={checked}
                onChange={() => setChecked(!checked)}
                disabled={!selectedShipping}
            />
            <label htmlFor="sameAddress">Same as shipping address</label>
            </div>
            {!checked && (
            <>
                <ul
                id="billingSelected"
                className="billing-address-container info-list show"
                >
                <li>
                    <img
                    src={require("../../assets/img/mdi_map-marker.svg")}
                    alt=""
                    />
                    {selectedBilling && (
                    <span>
                        {selectedBilling?.details?.address +
                        " " +
                        selectedBilling?.details?.city +
                        " " +
                        (selectedBilling?.details?.state || "") +
                        " " +
                        selectedBilling?.details?.postalCode}{" "}
                        {defaultAddress?.addressId ===
                        selectedBilling?.addressId && (
                        <span className="default mr-3">Default</span>
                        )}
                        {defaultAddressBilling?.addressId ===
                        selectedBilling?.addressId && (
                        <span className="default">Default Billing</span>
                        )}
                    </span>
                    )}
                </li>
                <li>
                    <img src={require("../../assets/img/mdi_phone.svg")} alt="" />
                    {selectedBilling && (
                    <span>{selectedBilling?.details?.mobileNumber}</span>
                    )}
                </li>
                </ul>
                <div
                className="billing-address-container collapse"
                id="billingList"
                >
                <ul className="infos-list">
                    {account?.addressesData.map((item) => (
                    <li
                        key={`key-billing-${item.addressId}`}
                        onClick={() => setSelectBilling(item)}
                    >
                        <div
                        className={
                            "indicator " +
                            (selectBilling?.addressId === item?.addressId
                            ? "active"
                            : "")
                        }
                        >
                        <div className="center"></div>
                        </div>
                        <div className="d-flex align-items-center info-container">
                        <div className="info">
                            <p>
                            {item.details?.address +
                                " " +
                                item.details?.city +
                                " " +
                                (item.details?.state || "") +
                                " " +
                                item.details?.postalCode}
                            </p>
                            <p>{item.details?.mobileNumber}</p>
                            <div className="d-flex align-items-center name">
                            {defaultAddress?.addressId === item?.addressId && (
                                <div className="default">Default</div>
                            )}
                            {defaultAddressBilling?.addressId ===
                                item?.addressId && (
                                <div className="default ml-3">Default Billing</div>
                            )}
                            </div>
                            <div className="d-flex mt-3">
                            {item?.addressId &&
                                defaultAddress?.addressId !== item?.addressId && (
                                <button
                                    className="default-btn mr-3"
                                    onClick={() => handleMakeDefaultAddress(item)}
                                >
                                    {isDefaultLoading &&
                                    isDefaultSelected.addressId ===
                                    item.addressId ? (
                                    <div
                                        className="spinner-border text-success"
                                        role="status"
                                    >
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    ) : (
                                    "Set as Default"
                                    )}
                                </button>
                                )}
                            {item?.addressId &&
                                defaultAddressBilling?.addressId !==
                                item?.addressId && (
                                <button
                                    className="default-btn"
                                    onClick={() =>
                                    handleMakeDefaultAddressBilling(item)
                                    }
                                >
                                    {isDefaultLoading &&
                                    isDefaultSelected.addressId ===
                                    item.addressId ? (
                                    <div
                                        className="spinner-border text-success"
                                        role="status"
                                    >
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    ) : (
                                    "Set as Default Billing"
                                    )}
                                </button>
                                )}
                            </div>
                        </div>
                        <button
                            className="edit-btn"
                            data-toggle="modal"
                            data-target="#addAddressModal"
                            onClick={() => handleEditAddress(item)}
                        >
                            Edit
                        </button>
                        </div>
                    </li>
                    ))}
                </ul>
                <button
                    className="add-btn"
                    data-toggle="modal"
                    data-target="#addAddressModal"
                    onClick={() => handleAddAddress()}
                >
                    + Add New Address
                </button>
                <div className="d-flex align-items-center justify-content-between">
                    <button
                    className="cancel-btn"
                    onClick={() => {
                        document.getElementById("billingBtn").click();
                    }}
                    >
                    Cancel
                    </button>
                    <button
                    className="save-btn"
                    onClick={() => handleSelect("billing", selectBilling)}
                    >
                    Save
                    </button>
                </div>
                </div>
            </>
            )}
        </div> */}
        <div
            className="modal fade"
            id="addAddressModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addAddressModal"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    <h2 className="modal-header">
                        {isEdit ? "Edit Address" : "Add New Address"}
                    </h2>
                    <div className="row">
                        <div className="col">
                        <div className="password-input form-group">
                            <label htmlFor="address">Address Line 1</label>
                            <Input
                                label="Address Line 1"
                                name="address1"
                                type="text"
                                value={formData.address1}
                                onChange={handleChange}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <div className="password-input form-group">
                            <label htmlFor="address">Address Line 2</label>
                            <Input
                                label="Address Line 2"
                                name="address2"
                                type="text"
                                value={formData.address2}
                                onChange={handleChange}
                            />
                        </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* <div className="col-12 col-sm-6">
                                            <label htmlFor="email">Email</label>
                                            <Input
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div> */}
                        <div className="col-12">
                        <div className="password-input form-group">
                            <label htmlFor="address">Phone Number</label>
                            <InputContact
                            country="US"
                            international
                            withCountryCallingCode
                            value={formData.mobileNumber}
                            className="form-control"
                            onChange={contactChange}
                            />
                        </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <div className="password-input form-group">
                                <label htmlFor="city">City</label>
                                <Input
                                label="City"
                                name="city"
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="password-input form-group">
                                <label htmlFor="postalCode">Postal Code</label>
                                <Input
                                label="Postal"
                                name="postalCode"
                                type="text"
                                value={formData.postalCode}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="password-input form-group">
                                <label htmlFor="country">Country</label>
                                <Dropdown
                                label="Country"
                                name="country"
                                value={formData.country}
                                options={countries}
                                onChange={handleChange}
                                valueKey={"name"}
                                />
                                {/* <Dropdown label="Country" name="country" value={formData.country} options={countries} onChange={handleChange} /> */}
                            </div>
                        </div>

                        {
                            formData.country !== ""
                            && states.length > 0
                            && <div className="col-12 col-sm-6">
                                <div className="password-input form-group">
                                <label htmlFor="state">State</label>
                                <Dropdown
                                    id="state"
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    options={states}
                                    onChange={handleChange}
                                    valueKey={"code"}
                                />
                                {/* <Dropdown label="State" name="state" value={formData.state} options={states} onChange={handleChange} /> */}
                                </div>
                            </div>
                        }
                    </div>

                    <div className="button-wrapper d-flex align-items-center justify-content-start">
                        <button
                            className={"addCardButton " + (isLoading ? "loading" : "")}
                            onClick={handleSubmit}
                            disabled={isDisabled && !isLoading}
                        >
                            {
                                isLoading
                                ? <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                : isEdit
                                    ? <>{"Save Changes"}</>
                                    : <>{"Add"}</>
                            }
                        </button>
                        <button
                            className="cancelCardButton close ml-2"
                            data-dismiss="modal"
                            id="closeAddressModal"
                            aria-label="Close"
                        >
                            Discard
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </>
};