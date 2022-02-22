import React, {useEffect, useCallback, useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAccount, getAllAddresses, addAddresses, updateAddressesById, makeDefaultAddress } from '../../actions/account';
import Edit from '../../assets/icon/pencil.svg';
import Input from '../shared/input';
import Dropdown from '../shared/dropdown';
import InputContact from 'react-phone-number-input/input';
import { formatPhoneNumberIntl, isPossiblePhoneNumber } from 'react-phone-number-input'
import { getCountries, getStates } from '../../actions/auth';

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
    country: "",
    countryCode: ""
};

export const CheckoutInfo = ({cart, selectedShipping, setSelectedShipping, selectedBilling, setSelectedBilling}) => {
    const account = useSelector((state) => state.account);
    const auth = useSelector((state) => state.auth);
    const [selectShipping, setSelectShipping] = useState(null);
    const [selectBilling, setSelectBilling] = useState(null);
    const [checked, setChecked] = useState(true);
    const [defaultAddress, setDefaultAddress] = useState(null);
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
        } else {
            setSelectedBilling(address);
            document.getElementById("billingBtn").click();
        }
    }

    const handleSubmit = () => {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        if(isEdit) {
            dispatch(updateAddressesById(user?.username, editAddress, formData));
        } else {
            dispatch(addAddresses(user?.username, formData));
        };
    }

    const handleAddAddress = () => {
        setIsEdit(false);
        setStates([]);
        setFormData(initialFormData);
    }

    const handleEditAddress = (address) => {
        setIsEdit(true);
        setStates([]);
        setFormData(address.details);
        setEditId(address.addressId);
        setEditAddress(address)
    }

    const handleMakeDefaultAddress = (address) => {
        setIsDefaultSelected(address);
        setIsDefaultLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(makeDefaultAddress(user?.username, address));
    }

    const contactChange = (value) => {
        setFormData({ ...formData, 'mobileNumber': value});
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const shippingList = (type) => {
        if (type === 'shipping') { 
            if (document.getElementById('infosCollapse').className.includes("show")) setSelectShipping(selectedShipping);
        } else { 
            if (document.getElementById('infosCollapse2').className.includes("show")) setSelectBilling(selectedBilling);
        }
    }
    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getAccount(user?.username));
        dispatch(getAllAddresses(user?.username));
        dispatch(getCountries());
    },[dispatch]);

    useEffect(()=>{
        setIsLoading(false);
        setIsDefaultLoading(false);
        setIsDefaultSelected(null);
        const isDefaultAddress = account?.addressesData?.find(address => address.isDefault === true);        
        setDefaultAddress(isDefaultAddress);
        if (cart?.checkoutDetail) {
            setSelectedShipping(cart?.checkoutDetail?.selectedShipping);
            setSelectShipping(cart?.checkoutDetail?.selectedShipping);
            setSelectedBilling(cart?.checkoutDetail?.selectedBilling);
            setSelectBilling(cart?.checkoutDetail?.selectedBilling);
            if (cart?.checkoutDetail?.selectedShipping?.addressId !== cart?.checkoutDetail?.selectedBilling?.addressId) {
                setChecked(false);
            };
        } else {
            setSelectedShipping(account?.addressesData[0]);
            if (!selectShipping) setSelectShipping(account?.addressesData[0]);
            setSelectedBilling(account?.addressesData[0]);
            if (!selectBilling) setSelectBilling(account?.addressesData[0]);
        }
        setIsEdit(false);
        setEditId("");
        setEditAddress(null);
        setStates([]);
        document.getElementById("closeAddressModal").click();
    },[account]);

    useEffect(() => {
        if (checked === true) {
            setSelectBilling(selectedShipping);
            setSelectedBilling(selectedShipping);
        }
    },[checked]);

    useEffect(() => {
        setCountries(auth?.countriesData);
        if (auth?.statesData?.length > 0) {
          setStates(auth?.statesData);
        } else {
          setStates([]);
          formData.state = "";
        }   
    }, [auth])

    useEffect(() => {
        const selectedCountry = countries.filter(e => e.name === formData.country);
        if (formData.country !== "" && selectedCountry) {
            const countryCode = selectedCountry[0]?.abbreviation;
            setFormData({ ...formData, countryCode });
            dispatch(getStates(countryCode))
        };
    }, [formData.country])

    const validation = useCallback(() => {
        const phoneCheck = formatPhoneNumberIntl(formData.mobileNumber) && isPossiblePhoneNumber(formData.mobileNumber) ? true : false;
        const checkState = formData.state === "" && states.length > 0 ? false : true;
        formData.mobileNumber !== "" && phoneCheck && formData.address1 !== "" && formData.city !== "" && formData.postalCode !== "" && formData.country !== "" && checkState ? setDisabled(false) : setDisabled(true);
    }, [formData, states])

    useEffect(() => {
        validation();
    }, [validation])

    return (
        <>
            <div className="customer-info">
                <div className="d-flex align-items-center justify-content-between title-container">
                    <h1 className="title m-0">Shipping Address</h1>
                    <div className="toggle">
                        <button className="main-edit-btn" type="button" id="shippingBtn" data-toggle="collapse" data-target="#infosCollapse" aria-expanded="false" aria-controls="infosCollapse" onClick={()=>shippingList('shipping')}>
                            <img src={Edit} alt="" />
                        </button>
                        <div className="toggle-menu collapse" id="infosCollapse">
                            <ul className="infos-list">
                                {
                                    account?.addressesData?.map(item => (
                                        <li key={`key-${item?.addressId}`} onClick={()=>setSelectShipping(item)}>
                                            <div className={"indicator " + (selectShipping?.addressId === item?.addressId ? "active" : "")}>
                                                <div className="center"></div>
                                            </div>
                                            <div className="d-flex align-items-center info-container">
                                                <div className="info">
                                                    {/* {item.details.givenName +  " " + item?.details?.familyName} */}
                                                    <p>{item.details?.address +  " " + item.details?.city +  " " + (item.details?.state || "") +  " " + item.details?.postalCode}</p>
                                                    <p>{item.details?.mobileNumber}</p>
                                                    <div className="d-flex align-items-center name">{defaultAddress?.addressId === item?.addressId && <div className="default">Default</div>}</div>
                                                    {/* <p>{item.details.email}</p> */}
                                                    {
                                                        item?.addressId && defaultAddress?.addressId !== item?.addressId && 
                                                        <button className="default-btn" onClick={()=>handleMakeDefaultAddress(item)}>
                                                            {
                                                                isDefaultLoading && isDefaultSelected.addressId === item.addressId ?  
                                                                <div className="spinner-border text-success" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div> 
                                                                : "Make Default"
                                                            }         
                                                        </button>
                                                    }
                                                </div>
                                                <button className="edit-btn" data-toggle="modal" data-target="#addAddressModal" onClick={() => handleEditAddress(item)}>Edit</button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            <button className="add-btn" data-toggle="modal" data-target="#addAddressModal" onClick={() => handleAddAddress()}>+ Add New Address</button>
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
                            {/* <img src={require("../../assets/img/mdi_account.svg")} alt="" />
                            <span className="name">{selectedShipping?.details?.givenName + ' ' + selectedShipping?.details?.familyName}</span> */}
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_map-marker.svg")} alt="" />
                            <span>{selectedShipping?.details?.address + ' ' + selectedShipping?.details?.city + ' ' + (selectedShipping?.details?.state || "") + ' ' + selectedShipping?.details?.postalCode} {defaultAddress?.addressId === selectedShipping?.addressId && <span className="default">Default</span>}</span>
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_phone.svg")} alt="" />
                            <span>{selectedShipping?.details?.mobileNumber}</span>
                        </li>
                        {/* <li>
                            <img src={require("../../assets/img/mdi_email.svg")} alt="" />
                            <span>{selectedShipping?.details?.email}</span>
                        </li> */}
                    </ul>
                </ul>
            </div>
            <div className="customer-info">
                <div className="d-flex align-items-center justify-content-between title-container m-0">
                    <h1 className="title m-0">Billing Address</h1>
                    {!checked && 
                        <div className="toggle">
                            <button className="main-edit-btn" type="button" id="billingBtn" data-toggle="collapse" data-target="#infosCollapse2" aria-expanded="false" aria-controls="infosCollapse2" onClick={()=>shippingList('billing')} disabled={checked}>
                                <img src={Edit} alt="" />
                            </button>
                            <div className="toggle-menu collapse" id="infosCollapse2">
                                <ul className="infos-list">
                                    {
                                        account?.addressesData.map(item => (
                                            <li key={`key-billing-${item.addressId}`} onClick={()=>setSelectBilling(item)}>
                                                <div className={"indicator " + (selectBilling?.addressId === item?.addressId ? "active" : "")}>
                                                    <div className="center"></div>
                                                </div>
                                                <div className="d-flex align-items-center info-container">
                                                    <div className="info">
                                                        {/* {item.details.givenName +  " " + item?.details?.familyName} */}
                                                        <p>{item.details?.address +  " " + item.details?.city +  " " + (item.details?.state || "") +  " " + item.details?.postalCode}</p>
                                                        <p>{item.details?.mobileNumber}</p>
                                                        {/* <p>{item.details.email}</p> */}
                                                        <div className="d-flex align-items-center name">{defaultAddress?.addressId === item?.addressId &&  <div className="default">Default</div>}</div>
                                                        {item?.addressId && defaultAddress?.addressId !== item?.addressId && 
                                                            <button className="default-btn" onClick={()=>handleMakeDefaultAddress(item)}>
                                                                {
                                                                    isDefaultLoading && isDefaultSelected.addressId === item.addressId ?  
                                                                    <div className="spinner-border text-success" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div> 
                                                                    : "Make Default"
                                                                }                                                                
                                                            </button>
                                                        }
                                                    </div>
                                                    <button className="edit-btn" data-toggle="modal" data-target="#addAddressModal" onClick={() => handleEditAddress(item)}>Edit</button>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <button className="add-btn" data-toggle="modal" data-target="#addAddressModal" onClick={() => handleAddAddress()}>+ Add New Address</button>
                                <div className="d-flex align-items-center justify-content-between">
                                    {/* <button className="cancel-btn">Cancel</button> */}
                                    <button className="cancel-btn" onClick={()=>{document.getElementById("billingBtn").click()}}>Cancel</button>
                                    <button className="save-btn" onClick={()=>handleSelect('billing', selectBilling)}>Save</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" id="sameAddress" name="sameAddress" checked={checked} onChange={() => setChecked(!checked)} />
                    <label htmlFor="sameAddress">Same as shipping address</label>
                </div>
                {!checked &&
                    <ul className="info-list">
                        {/* <li>
                            <img src={require("../../assets/img/mdi_account.svg")} alt="" />
                            <span className="name">{selectedBilling?.details?.givenName + ' ' + selectedBilling?.details?.familyName}</span>
                            
                        </li> */}
                        <li>
                            <img src={require("../../assets/img/mdi_map-marker.svg")} alt="" />
                            <span>{selectedBilling?.details?.address + ' ' + selectedBilling?.details?.city + ' ' + (selectedBilling?.details?.state || "") + ' ' + selectedBilling?.details?.postalCode} {defaultAddress?.addressId === selectedBilling?.addressId && <span className="default">Default</span>}</span>
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_phone.svg")} alt="" />
                            <span>{selectedBilling?.details?.mobileNumber}</span>
                        </li>
                        {/* <li>
                            <img src={require("../../assets/img/mdi_email.svg")} alt="" />
                            <span>{selectedBilling?.details?.email}</span>
                        </li> */}
                    </ul>
                }
            </div>
            <div className="modal fade" id="addAddressModal" tabIndex="-1" role="dialog" aria-labelledby="addAddressModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h2 className="sub-title">{isEdit ? 'Edit Address' : 'Add New Address'}</h2>
                            {/* <div className="row">
                                <div className="col-12 col-sm-6">
                                    <div className="password-input form-group">
                                        <label htmlFor="givenName">First Name</label>
                                        <Input
                                            label="First Name"
                                            name="givenName"
                                            type="text"
                                            value={formData.givenName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="password-input form-group">
                                        <label htmlFor="familyName">Last Name</label>
                                        <Input
                                            label="Last Name"
                                            name="familyName"
                                            type="text"
                                            value={formData.familyName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col">
                                    <div className="password-input form-group">
                                        <label htmlFor="address">Address 1</label>
                                        <Input
                                            label="Address 1"
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
                                        <label htmlFor="address">Address 2</label>
                                        <Input
                                            label="Address 2"
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
                                        <Dropdown label="Country" name="country" value={formData.country} options={countries} onChange={handleChange} valueKey={'name'} />
                                        {/* <Dropdown label="Country" name="country" value={formData.country} options={countries} onChange={handleChange} /> */}
                                    </div>
                                </div>
                                {states?.length > 0 && 
                                    <div className="col-12 col-sm-6">
                                        <div className="password-input form-group">
                                            <label htmlFor="state">State</label>
                                            <Dropdown id="state" label="State" name="state" value={formData.state} options={states} onChange={handleChange} valueKey={'code'} />
                                            {/* <Dropdown label="State" name="state" value={formData.state} options={states} onChange={handleChange} /> */}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="button-wrapper d-flex align-items-center justify-content-end">
                                <button className="cancelCardButton close" data-dismiss="modal" id="closeAddressModal" aria-label="Close">
                                    Cancel
                                </button>
                                <button className={"addCardButton " + (isLoading ? 'loading' : '')} onClick={handleSubmit}  disabled={isDisabled && !isLoading}>
                                    {isLoading ?
                                        <div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        :
                                        isEdit ? 'Save' : 'Add'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}