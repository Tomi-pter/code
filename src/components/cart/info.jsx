import React, {useEffect, useState} from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAccount, getAllAddresses } from '../../actions/account';
import Edit from '../../assets/icon/pencil.svg';

const initialState = {details: {address: "", city: "", country: "", email: "", familyName: "", givenName: "", mobileNumber: "", postalCode: "", state: ""}};

export const CheckoutInfo = ({selectedShipping, setSelectedShipping, selectedBilling, setSelectedBilling}) => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const [selectShipping, setSelectShipping] = useState(null);
    const [selectBilling, setSelectBilling] = useState(null);
    const [checked, setChecked] = useState(true);
    const [defaultAddress, setDefaultAddress] = useState(null);

    const handleChecked = () => {
        setChecked(!checked);
        if (!checked) {
            setSelectBilling(selectedShipping);
            setSelectedBilling(selectedShipping);
            document.getElementById("billingBtn").disabled = true;
        } else {
            document.getElementById("billingBtn").disabled = false;
            document.getElementById("billingBtn").click();
        };
    }

    const handleSelect = (addressFor, address) => {
        if (addressFor === "shipping") {
            setSelectedShipping(address);
            if (checked) {
                setSelectBilling(address);
                setSelectedBilling(address);
            }
            document.getElementById("shippingBtn").click();
        } else {
            setSelectedBilling(address);
            document.getElementById("billingBtn").click();
        }
    }
    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getAccount(user?.username));
        dispatch(getAllAddresses(user?.username));
    },[dispatch]);

    useEffect(()=>{
        setSelectedShipping(account?.addressesData[0]);
        setDefaultAddress(account?.addressesData[0]);
        setSelectedBilling(selectedShipping);
        setSelectBilling(selectedShipping);
        setSelectShipping(selectedShipping);
    },[account]);

    return (
        <>
            <div className="customer-info">
                <div className="d-flex align-items-center justify-content-between title-container">
                    <h1 className="title m-0">Shipping Address</h1>
                    <div className="toggle">
                        <button className="main-edit-btn" type="button" id="shippingBtn" data-toggle="collapse" data-target="#infosCollapse" aria-expanded="false" aria-controls="infosCollapse">
                            <img src={Edit} alt="" />
                        </button>
                        <div className="toggle-menu collapse" id="infosCollapse">
                            <ul className="infos-list">
                                {
                                    account?.addressesData.map(item => (
                                        <li key={`key-${item.addressId}`} onClick={()=>setSelectShipping(item)}>
                                            <div className={"indicator " + (selectShipping === item ? "active" : "")}>
                                                <div className="center"></div>
                                            </div>
                                            <div className="d-flex align-items-center info-container">
                                                <div className="info">
                                                    <div className="d-flex align-items-center name">{item.details.givenName +  " " + item?.details?.familyName} {defaultAddress === item && <div className="default">Default</div>}</div>
                                                    <p>{item.details.address +  " " + item.details.city +  " " + item.details.country +  " " + item.details.postalCode}</p>
                                                    <p>{item.details.mobileNumber}</p>
                                                    <p>{item.details.email}</p>
                                                    {defaultAddress !== item && <button className="default-btn">Make Default</button>}
                                                </div>
                                                <button className="edit-btn">Edit</button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            <button className="add-btn">+ Add New Address</button>
                            <div className="d-flex align-items-center justify-content-between">
                                <button className="cancel-btn" onClick={()=>{document.getElementById("shippingBtn").click()}}>Cancel</button>
                                <button className="save-btn" onClick={()=>handleSelect('shipping', selectShipping)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="info-list">
                    <ul className="info-list">
                        <li>
                            <img src={require("../../assets/img/mdi_account.svg")} alt="" />
                            <span className="name">{selectedShipping?.details?.givenName + ' ' + selectedShipping?.details?.familyName}</span>
                            {defaultAddress === selectedShipping && <span className="default">Default</span>}
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_map-marker.svg")} alt="" />
                            <span>{selectedShipping?.details?.address + ' ' + selectedShipping?.details?.city + ' ' + selectedShipping?.details?.country + ' ' + selectedShipping?.details?.postalCode}</span>
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_phone.svg")} alt="" />
                            <span>{selectedShipping?.details?.mobileNumber}</span>
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_email.svg")} alt="" />
                            <span>{selectedShipping?.details?.email}</span>
                        </li>
                    </ul>
                </ul>
            </div>
            <div className="customer-info">
                <div className="d-flex align-items-center justify-content-between title-container m-0">
                    <h1 className="title m-0">Billing Address</h1>
                    <div className="toggle">
                        <button className="main-edit-btn" type="button" id="billingBtn" data-toggle="collapse" data-target="#infosCollapse2" aria-expanded="false" aria-controls="infosCollapse2" disabled>
                            <img src={Edit} alt="" />
                        </button>
                        <div className="toggle-menu collapse" id="infosCollapse2">
                            <ul className="infos-list">
                                {
                                    account?.addressesData.map(item => (
                                        <li key={`key-billing-${item.addressId}`} onClick={()=>setSelectBilling(item)}>
                                            <div className={"indicator " + (selectBilling === item ? "active" : "")}>
                                                <div className="center"></div>
                                            </div>
                                            <div className="d-flex align-items-center info-container">
                                                <div className="info">
                                                    <div className="d-flex align-items-center name">{item.details.givenName +  " " + item?.details?.familyName} {defaultAddress === item &&  <div className="default">Default</div>}</div>
                                                    <p>{item.details.address +  " " + item.details.city +  " " + item.details.country +  " " + item.details.postalCode}</p>
                                                    <p>{item.details.mobileNumber}</p>
                                                    <p>{item.details.email}</p>
                                                    {defaultAddress !== item && <button className="default-btn">Make Default</button>}
                                                </div>
                                                <button className="edit-btn">Edit</button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            <button className="add-btn">+ Add New Address</button>
                            <div className="d-flex align-items-center justify-content-between">
                                <button className="cancel-btn">Cancel</button>
                                <button className="save-btn" onClick={()=>handleSelect('billing', selectBilling)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" id="sameAddress" name="sameAddress" defaultChecked={checked} onChange={() => handleChecked()} />
                    <label htmlFor="sameAddress">Same as shipping address</label>
                </div>
                {!checked &&
                    <ul className="info-list">
                        <li>
                            <img src={require("../../assets/img/mdi_account.svg")} alt="" />
                            <span className="name">{selectedBilling?.details?.givenName + ' ' + selectedBilling?.details?.familyName}</span>
                            {defaultAddress === selectedBilling && <span className="default">Default</span>}
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_map-marker.svg")} alt="" />
                            <span>{selectedBilling?.details?.address + ' ' + selectedBilling?.details?.city + ' ' + selectedBilling?.details?.country + ' ' + selectedBilling?.details?.postalCode}</span>
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_phone.svg")} alt="" />
                            <span>{selectedBilling?.details?.mobileNumber}</span>
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_email.svg")} alt="" />
                            <span>{selectedBilling?.details?.email}</span>
                        </li>
                    </ul>
                }
            </div>
        </>
    )
}