import React, {useEffect, useCallback, useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAccount, getAllAddresses, addAddresses, updateAddressesById, makeDefaultAddress } from '../../actions/account';
import Edit from '../../assets/icon/pencil.svg';
import Input from '../shared/input';
import Dropdown from '../shared/dropdown';
import InputContact from 'react-phone-number-input/input';
import { formatPhoneNumberIntl, isPossiblePhoneNumber } from 'react-phone-number-input'

const initialFormData = {
    givenName: "",
    familyName: "",
    email: "",
    mobileNumber: "",
    address: "",
    company: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
};
const states = [
    ["AL","Alabama"],
    ["AK","Alaska"],
    ["AZ","Arizona"],
    ["AR","Arkansas"],
    ["CA","California"],
    ["CO","Colorado"],
    ["CT","Connecticut"],
    ["DE","Delaware"],
    ["DC","District of Columbia"],
    ["FL","Florida"],
    ["GA","Georgia"],
    ["GU","Guam"],
    ["HI","Hawaii"],
    ["ID","Idaho"],
    ["IL","Illinois"],
    ["IN","Indiana"],
    ["IA","Iowa"],
    ["KS","Kansas"],
    ["KY","Kentucky"],
    ["LA","Louisiana"],
    ["ME","Maine"],
    ["MD","Maryland"],
    ["MA","Massachusetts"],
    ["MI","Michigan"],
    ["MN","Minnesota"],
    ["MS","Mississippi"],
    ["MO","Missouri"],
    ["MT","Montana"],
    ["NE","Nebraska"],
    ["NV","Nevada"],
    ["NH","New Hampshire"],
    ["NJ","New Jersey"],
    ["NM","New Mexico"],
    ["NY","New York"],
    ["NC","North Carolina"],
    ["ND","North Dakota"],
    ["MP","Northern Marina Islands"],
    ["OH","Ohio"],
    ["OK","Oklahoma"],
    ["OR","Oregon"],
    ["PA","Pennsylvania"],
    ["RI","Rhode Island"],
    ["SC","South Carolina"],
    ["SD","South Dakota"],
    ["TN","Tennessee"],
    ["TX","Texas"],
    ["AA","U.S. Armed Forces - Americas"],
    ["AE","U.S. Armed Forces - Europe"],
    ["AP","U.S. Armed Forces - Pacific"],
    ["xx","Unknown State"],
    ["UT","Utah"],
    ["VT","Vermont"],
    ["VI","Virgin Islands, U.S."],
    ["VA","Virginia"],
    ["WA","Washington"],
    ["WV","West Virginia"],
    ["WI","Wisconsin"],
    ["WY","Wyoming"],
    ["AB","Alberta"],
    ["BC","British Columbia"],
    ["MB","Manitoba"],
    ["NB","New Brunswick"],
    ["NL","Newfoundland"],
    ["NT","Northwest Territories"],
    ["NS","Nova Scotia"],
    ["NU","Nunavut"],
    ["ON","Ontario"],
    ["PE","Prince Edward Island"],
    ["QC","Quebec"],
    ["SK","Saskatchewan"],
    ["YT","Yukon"],
    ["ACT","Australian Capital Territory"],
    ["NSW","New South Wales"],
    ["NT","Northern Territory"],
    ["QLD","Queensland"],
    ["SA","South Australia"],
    ["TAS","Tasmania"],
    ["VIC","Victoria"],
    ["WA","Western Australia"]
];
const countries = [
    ["UNITED STATES", "UNITED STATES"],
    ["CANADA", "CANADA"],
    ["UNITED KINGDOM", "UNITED KINGDOM"],
    ["RUSSIAN FEDERATION", "RUSSIAN FEDERATION"],
    ["CHINA", "CHINA"],
    ["JAPAN", "JAPAN"],
    ["KOREA, REPUBLIC OF", "KOREA, REPUBLIC OF"],
    ["KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF", "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF"],
    ["MEXICO", "MEXICO"],
    ["GERMANY", "GERMANY"],
    ["SPAIN", "SPAIN"],
    ["FRANCE", "FRANCE"],
    ["FINLAND", "FINLAND"],
    ["ICELAND", "ICELAND"],
    ["AUSTRALIA", "AUSTRALIA"],
    ["AFGHANISTAN", "AFGHANISTAN"],
    ["ALAND ISLANDS", "ALAND ISLANDS"],
    ["ALBANIA", "ALBANIA"],
    ["ALGERIA", "ALGERIA"],
    ["AMERICAN SAMOA", "AMERICAN SAMOA"],
    ["ANDORRA", "ANDORRA"],
    ["ANGOLA", "ANGOLA"],
    ["ANGUILLA", "ANGUILLA"],
    ["ANTARCTICA", "ANTARCTICA"],
    ["ANTIGUA AND BARBUDA", "ANTIGUA AND BARBUDA"],
    ["ARGENTINA", "ARGENTINA"],
    ["ARMENIA", "ARMENIA"],
    ["ARUBA", "ARUBA"],
    ["AUSTRIA", "AUSTRIA"],
    ["AZERBAIJAN", "AZERBAIJAN"],
    ["BAHAMAS", "BAHAMAS"],
    ["BAHRAIN", "BAHRAIN"],
    ["BANGLADESH", "BANGLADESH"],
    ["BARBADOS", "BARBADOS"],
    ["BELARUS", "BELARUS"],
    ["BELGIUM", "BELGIUM"],
    ["BELIZE", "BELIZE"],
    ["BENIN", "BENIN"],
    ["BERMUDA", "BERMUDA"],
    ["BHUTAN", "BHUTAN"],
    ["BOLIVIA", "BOLIVIA"],
    ["BOSNIA AND HERZEGOVINA", "BOSNIA AND HERZEGOVINA"],
    ["BOTSWANA", "BOTSWANA"],
    ["BOUVET ISLAND", "BOUVET ISLAND"],
    ["BRAZIL", "BRAZIL"],
    ["BRITISH INDIAN OCEAN TERRITORY", "BRITISH INDIAN OCEAN TERRITORY"],
    ["BRUNEI DARUSSALAM", "BRUNEI DARUSSALAM"],
    ["BULGARIA", "BULGARIA"],
    ["BURKINA FASO", "BURKINA FASO"],
    ["BURUNDI", "BURUNDI"],
    ["CAMBODIA", "CAMBODIA"],
    ["CAMEROON", "CAMEROON"],
    ["CAPE VERDE", "CAPE VERDE"],
    ["CAYMAN ISLANDS", "CAYMAN ISLANDS"],
    ["CENTRAL AFRICAN REPUBLIC", "CENTRAL AFRICAN REPUBLIC"],
    ["CHAD", "CHAD"],
    ["CHILE", "CHILE"],
    ["CHRISTMAS ISLAND", "CHRISTMAS ISLAND"],
    ["COCOS (KEELING) ISLANDS", "COCOS (KEELING) ISLANDS"],
    ["COLOMBIA", "COLOMBIA"],
    ["COMOROS", "COMOROS"],
    ["CONGO", "CONGO"],
    ["CONGO, THE DEMOCRATIC REPUBLIC OF THE", "CONGO, THE DEMOCRATIC REPUBLIC OF THE"],
    ["COOK ISLANDS", "COOK ISLANDS"],
    ["COSTA RICA", "COSTA RICA"],
    ["COTE D'IVOIRE", "COTE D'IVOIRE"],
    ["CROATIA", "CROATIA"],
    ["CUBA", "CUBA"],
    ["CYPRUS", "CYPRUS"],
    ["CZECH REPUBLIC", "CZECH REPUBLIC"],
    ["DENMARK", "DENMARK"],
    ["DJIBOUTI", "DJIBOUTI"],
    ["DOMINICA", "DOMINICA"],
    ["DOMINICAN REPUBLIC", "DOMINICAN REPUBLIC"],
    ["ECUADOR", "ECUADOR"],
    ["EGYPT", "EGYPT"],
    ["EL SALVADOR", "EL SALVADOR"],
    ["EQUATORIAL GUINEA", "EQUATORIAL GUINEA"],
    ["ERITREA", "ERITREA"],
    ["ESTONIA", "ESTONIA"],
    ["ETHIOPIA", "ETHIOPIA"],
    ["FALKLAND ISLANDS (MALVINAS)", "FALKLAND ISLANDS (MALVINAS)"],
    ["FAROE ISLANDS", "FAROE ISLANDS"],
    ["FIJI", "FIJI"],
    ["FRENCH GUIANA", "FRENCH GUIANA"],
    ["FRENCH POLYNESIA", "FRENCH POLYNESIA"],
    ["FRENCH SOUTHERN TERRITORIES", "FRENCH SOUTHERN TERRITORIES"],
    ["GABON", "GABON"],
    ["GAMBIA", "GAMBIA"],
    ["GEORGIA", "GEORGIA"],
    ["GHANA", "GHANA"],
    ["GIBRALTAR", "GIBRALTAR"],
    ["GREECE", "GREECE"],
    ["GREENLAND", "GREENLAND"],
    ["GRENADA", "GRENADA"],
    ["GUADELOUPE", "GUADELOUPE"],
    ["GUAM", "GUAM"],
    ["GUATEMALA", "GUATEMALA"],
    ["GUERNSEY", "GUERNSEY"],
    ["GUINEA", "GUINEA"],
    ["GUINEA-BISSAU", "GUINEA-BISSAU"],
    ["GUYANA", "GUYANA"],
    ["HAITI", "HAITI"],
    ["HEARD ISLAND AND MCDONALD ISLANDS", "HEARD ISLAND AND MCDONALD ISLANDS"],
    ["HOLY SEE (VATICAN CITY STATE)", "HOLY SEE (VATICAN CITY STATE)"],
    ["HONDURAS", "HONDURAS"],
    ["HONG KONG", "HONG KONG"],
    ["HUNGARY", "HUNGARY"],
    ["INDIA", "INDIA"],
    ["INDONESIA", "INDONESIA"],
    ["IRAN, ISLAMIC REPUBLIC OF", "IRAN, ISLAMIC REPUBLIC OF"],
    ["IRAQ", "IRAQ"],
    ["IRELAND", "IRELAND"],
    ["ISLE OF MAN", "ISLE OF MAN"],
    ["ISRAEL", "ISRAEL"],
    ["ITALY", "ITALY"],
    ["JAMAICA", "JAMAICA"],
    ["JERSEY", "JERSEY"],
    ["JORDAN", "JORDAN"],
    ["KAZAKHSTAN", "KAZAKHSTAN"],
    ["KENYA", "KENYA"],
    ["KIRIBATI", "KIRIBATI"],
    ["KUWAIT", "KUWAIT"],
    ["KYRGYZSTAN", "KYRGYZSTAN"],
    ["LAO PEOPLE'S DEMOCRATIC REPUBLIC", "LAO PEOPLE'S DEMOCRATIC REPUBLIC"],
    ["LATVIA", "LATVIA"],
    ["LEBANON", "LEBANON"],
    ["LESOTHO", "LESOTHO"],
    ["LIBERIA", "LIBERIA"],
    ["LIBYAN ARAB JAMAHIRIYA", "LIBYAN ARAB JAMAHIRIYA"],
    ["LIECHTENSTEIN", "LIECHTENSTEIN"],
    ["LITHUANIA", "LITHUANIA"],
    ["LUXEMBOURG", "LUXEMBOURG"],
    ["MACAO", "MACAO"],
    ["MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF", "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF"],
    ["MADAGASCAR", "MADAGASCAR"],
    ["MALAWI", "MALAWI"],
    ["MALAYSIA", "MALAYSIA"],
    ["MALDIVES", "MALDIVES"],
    ["MALI", "MALI"],
    ["MALTA", "MALTA"],
    ["MARSHALL ISLANDS", "MARSHALL ISLANDS"],
    ["MARTINIQUE", "MARTINIQUE"],
    ["MAURITANIA", "MAURITANIA"],
    ["MAURITIUS", "MAURITIUS"],
    ["MAYOTTE", "MAYOTTE"],
    ["MICRONESIA, FEDERATED STATES OF", "MICRONESIA, FEDERATED STATES OF"],
    ["MOLDOVA, REPUBLIC OF", "MOLDOVA, REPUBLIC OF"],
    ["MONACO", "MONACO"],
    ["MONGOLIA", "MONGOLIA"],
    ["MONTSERRAT", "MONTSERRAT"],
    ["MOROCCO", "MOROCCO"],
    ["MOZAMBIQUE", "MOZAMBIQUE"],
    ["MYANMAR", "MYANMAR"],
    ["NAMIBIA", "NAMIBIA"],
    ["NAURU", "NAURU"],
    ["NEPAL", "NEPAL"],
    ["NETHERLANDS", "NETHERLANDS"],
    ["NETHERLANDS ANTILLES", "NETHERLANDS ANTILLES"],
    ["NEW CALEDONIA", "NEW CALEDONIA"],
    ["NEW ZEALAND", "NEW ZEALAND"],
    ["NICARAGUA", "NICARAGUA"],
    ["NIGER", "NIGER"],
    ["NIGERIA", "NIGERIA"],
    ["NIUE", "NIUE"],
    ["NORFOLK ISLAND", "NORFOLK ISLAND"],
    ["NORTHERN MARIANA ISLANDS", "NORTHERN MARIANA ISLANDS"],
    ["NORWAY", "NORWAY"],
    ["OMAN", "OMAN"],
    ["PAKISTAN", "PAKISTAN"],
    ["PALAU", "PALAU"],
    ["PALESTINIAN TERRITORY, OCCUPIED", "PALESTINIAN TERRITORY, OCCUPIED"],
    ["PANAMA", "PANAMA"],
    ["PAPUA NEW GUINEA", "PAPUA NEW GUINEA"],
    ["PARAGUAY", "PARAGUAY"],
    ["PERU", "PERU"],
    ["PHILIPPINES", "PHILIPPINES"],
    ["PITCAIRN", "PITCAIRN"],
    ["POLAND", "POLAND"],
    ["PORTUGAL", "PORTUGAL"],
    ["PUERTO RICO", "PUERTO RICO"],
    ["QATAR", "QATAR"],
    ["REUNION", "REUNION"],
    ["ROMANIA", "ROMANIA"],
    ["RWANDA", "RWANDA"],
    ["SAINT HELENA", "SAINT HELENA"],
    ["SAINT KITTS AND NEVIS", "SAINT KITTS AND NEVIS"],
    ["SAINT LUCIA", "SAINT LUCIA"],
    ["SAINT PIERRE AND MIQUELON", "SAINT PIERRE AND MIQUELON"],
    ["SAINT VINCENT AND THE GRENADINES", "SAINT VINCENT AND THE GRENADINES"],
    ["SAMOA", "SAMOA"],
    ["SAN MARINO", "SAN MARINO"],
    ["SAO TOME AND PRINCIPE", "SAO TOME AND PRINCIPE"],
    ["SAUDI ARABIA", "SAUDI ARABIA"],
    ["SENEGAL", "SENEGAL"],
    ["SERBIA AND MONTENEGRO", "SERBIA AND MONTENEGRO"],
    ["SEYCHELLES", "SEYCHELLES"],
    ["SIERRA LEONE", "SIERRA LEONE"],
    ["SINGAPORE", "SINGAPORE"],
    ["SLOVAKIA", "SLOVAKIA"],
    ["SLOVENIA", "SLOVENIA"],
    ["SOLOMON ISLANDS", "SOLOMON ISLANDS"],
    ["SOMALIA", "SOMALIA"],
    ["SOUTH AFRICA", "SOUTH AFRICA"],
    ["SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS", "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS"],
    ["SRI LANKA", "SRI LANKA"],
    ["SUDAN", "SUDAN"],
    ["SURINAME", "SURINAME"],
    ["SVALBARD AND JAN MAYEN", "SVALBARD AND JAN MAYEN"],
    ["SWAZILAND", "SWAZILAND"],
    ["SWEDEN", "SWEDEN"],
    ["SWITZERLAND", "SWITZERLAND"],
    ["SYRIAN ARAB REPUBLIC", "SYRIAN ARAB REPUBLIC"],
    ["TAIWAN, PROVINCE OF CHINA", "TAIWAN, PROVINCE OF CHINA"],
    ["TAJIKISTAN", "TAJIKISTAN"],
    ["TANZANIA, UNITED REPUBLIC OF", "TANZANIA, UNITED REPUBLIC OF"],
    ["THAILAND", "THAILAND"],
    ["TIMOR-LESTE", "TIMOR-LESTE"],
    ["TOGO", "TOGO"],
    ["TOKELAU", "TOKELAU"],
    ["TONGA", "TONGA"],
    ["TRINIDAD AND TOBAGO", "TRINIDAD AND TOBAGO"],
    ["TUNISIA", "TUNISIA"],
    ["TURKEY", "TURKEY"],
    ["TURKMENISTAN", "TURKMENISTAN"],
    ["TURKS AND CAICOS ISLANDS", "TURKS AND CAICOS ISLANDS"],
    ["TUVALU", "TUVALU"],
    ["UGANDA", "UGANDA"],
    ["UKRAINE", "UKRAINE"],
    ["UNITED ARAB EMIRATES", "UNITED ARAB EMIRATES"],
    ["UNITED STATES MINOR OUTLYING ISLANDS", "UNITED STATES MINOR OUTLYING ISLANDS"],
    ["URUGUAY", "URUGUAY"],
    ["UZBEKISTAN", "UZBEKISTAN"],
    ["VANUATU", "VANUATU"],
    ["VENEZUELA", "VENEZUELA"],
    ["VIET NAM", "VIET NAM"],
    ["VIRGIN ISLANDS, BRITISH", "VIRGIN ISLANDS, BRITISH"],
    ["VIRGIN ISLANDS, U.S.", "VIRGIN ISLANDS, U.S."],
    ["WALLIS AND FUTUNA", "WALLIS AND FUTUNA"],
    ["WESTERN SAHARA", "WESTERN SAHARA"],
    ["YEMEN", "YEMEN"],
    ["ZAMBIA", "ZAMBIA"],
    ["ZIMBABWE", "ZIMBABWE"],
    ["SOUTH SUDAN", "SOUTH SUDAN"],
]

export const CheckoutInfo = ({cart, selectedShipping, setSelectedShipping, selectedBilling, setSelectedBilling}) => {
    const account = useSelector((state) => state.account);
    const [selectShipping, setSelectShipping] = useState(null);
    const [selectBilling, setSelectBilling] = useState(null);
    const [checked, setChecked] = useState(true);
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDefaultSelected, setIsDefaultSelected] = useState(null);
    const [isDefaultLoading, setIsDefaultLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState("");
    const [formData, setFormData] = useState(initialFormData);
    const [isDisabled, setDisabled] = useState(true);
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
            dispatch(updateAddressesById(user?.username, editId, formData));
        } else {
            dispatch(addAddresses(user?.username, formData));
        };
    }

    const handleAddAddress = () => {
        setFormData(initialFormData);
    }

    const handleEditAddress = (address) => {
        setIsEdit(true);
        setFormData(address.details);
        setEditId(address.addressId);
    }

    const handleMakeDefaultAddress = (address) => {
        setIsDefaultSelected(address);
        setIsDefaultLoading(true);
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(makeDefaultAddress(user?.username, address.addressId));
    }

    const contactChange = (value) => {
        setFormData({ ...formData, 'mobileNumber': value});
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validation = useCallback(() => {
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        const phoneCheck = formatPhoneNumberIntl(formData.mobileNumber) && isPossiblePhoneNumber(formData.mobileNumber) ? true : false;
        formData.email && formData.mobileNumber && phoneCheck && emailCheck && formData.givenName && formData.familyName && formData.address && formData.city && formData.state && formData.postalCode && formData.country ? setDisabled(false) : setDisabled(true);
    }, [formData])
    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getAccount(user?.username));
        dispatch(getAllAddresses(user?.username));
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
            setSelectShipping(account?.addressesData[0]);
            setSelectedBilling(account?.addressesData[0]);
            setSelectBilling(account?.addressesData[0]);
        }
        setIsEdit(false);
        setEditId("");
        document.getElementById("closeAddressModal").click();
    },[account]);

    useEffect(() => {
        if (checked === true) {
            setSelectBilling(selectedShipping);
            setSelectedBilling(selectedShipping);
        }
    },[checked]);

    useEffect(() => {
        validation();
    }, [validation])

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
                                            <div className={"indicator " + (selectShipping?.addressId === item?.addressId ? "active" : "")}>
                                                <div className="center"></div>
                                            </div>
                                            <div className="d-flex align-items-center info-container">
                                                <div className="info">
                                                    <div className="d-flex align-items-center name">{item.details.givenName +  " " + item?.details?.familyName} {defaultAddress?.addressId === item?.addressId && <div className="default">Default</div>}</div>
                                                    <p>{item.details.address +  " " + item.details.city +  " " + item.details.state +  " " + item.details.postalCode}</p>
                                                    <p>{item.details.mobileNumber}</p>
                                                    <p>{item.details.email}</p>
                                                    {
                                                        defaultAddress?.addressId !== item?.addressId && 
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
                            <img src={require("../../assets/img/mdi_account.svg")} alt="" />
                            <span className="name">{selectedShipping?.details?.givenName + ' ' + selectedShipping?.details?.familyName}</span>
                            {defaultAddress?.addressId === selectedShipping?.addressId && <span className="default">Default</span>}
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_map-marker.svg")} alt="" />
                            <span>{selectedShipping?.details?.address + ' ' + selectedShipping?.details?.city + ' ' + selectedShipping?.details?.state + ' ' + selectedShipping?.details?.postalCode}</span>
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
                    {!checked && 
                        <div className="toggle">
                            <button className="main-edit-btn" type="button" id="billingBtn" data-toggle="collapse" data-target="#infosCollapse2" aria-expanded="false" aria-controls="infosCollapse2" disabled={checked}>
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
                                                        <div className="d-flex align-items-center name">{item.details.givenName +  " " + item?.details?.familyName} {defaultAddress?.addressId === item?.addressId &&  <div className="default">Default</div>}</div>
                                                        <p>{item.details.address +  " " + item.details.city +  " " + item.details.state +  " " + item.details.postalCode}</p>
                                                        <p>{item.details.mobileNumber}</p>
                                                        <p>{item.details.email}</p>
                                                        {defaultAddress?.addressId !== item?.addressId && 
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
                                    <button className="cancel-btn">Cancel</button>
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
                        <li>
                            <img src={require("../../assets/img/mdi_account.svg")} alt="" />
                            <span className="name">{selectedBilling?.details?.givenName + ' ' + selectedBilling?.details?.familyName}</span>
                            {defaultAddress?.addressId === selectedBilling?.addressId && <span className="default">Default</span>}
                        </li>
                        <li>
                            <img src={require("../../assets/img/mdi_map-marker.svg")} alt="" />
                            <span>{selectedBilling?.details?.address + ' ' + selectedBilling?.details?.city + ' ' + selectedBilling?.details?.state + ' ' + selectedBilling?.details?.postalCode}</span>
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
            <div className="modal fade" id="addAddressModal" tabIndex="-1" role="dialog" aria-labelledby="addAddressModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h2 className="sub-title">Add New Address</h2>
                            <div className="row">
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
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
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
                                <div className="col">
                                    <div className="password-input form-group">
                                        <label htmlFor="address">Address</label>
                                        <Input
                                            label="Address"
                                            name="address"
                                            type="text"
                                            value={formData.address}
                                            onChange={handleChange}
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
                                        <label htmlFor="state">State</label>
                                        <Dropdown label="State" name="state" value={formData.state} options={states} onChange={handleChange} />
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
                                        <Dropdown label="Country" name="country" value={formData.country} options={countries} onChange={handleChange} />
                                    </div>
                                </div>
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