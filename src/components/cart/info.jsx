import React, {useEffect} from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAccount } from '../../actions/account';
import Edit from '../../assets/icon/pencil.svg';

export default props => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getAccount(user?.username));
    },[dispatch]);

    return (
        <>
            <div className="customer-info">
                <div className="d-flex align-items-center justify-content-between title-container">
                    <h1 className="title m-0">Shipping Address</h1>
                    <div className="toggle">
                        <button className="main-edit-btn" type="button" data-toggle="collapse" data-target="#infosCollapse" aria-expanded="false" aria-controls="infosCollapse">
                            <img src={Edit} alt="" />
                        </button>
                        <div className="toggle-menu collapse" id="infosCollapse">
                            <ul className="infos-list">
                                <li>
                                    <div className="indicator active">
                                        <div className="center"></div>
                                    </div>
                                    <div className="d-flex align-items-center info-container">
                                        <div className="info">
                                            <div className="d-flex align-items-center name">John Doe <div className="default">Default</div></div>
                                            <p>74 Williams St., Laurel, MD 20707</p>
                                            <p>123456789</p>
                                            <p>johndoe@gmail.com</p>
                                        </div>
                                        <button className="edit-btn">Edit</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="indicator">
                                        <div className="center"></div>
                                    </div>
                                    <div className="d-flex align-items-center info-container">
                                        <div className="info">
                                            <div className="d-flex align-items-center name">John Doe</div>
                                            <p>74 Williams St., Laurel, MD 20707</p>
                                            <p>123456789</p>
                                            <p>johndoe@gmail.com</p>
                                            <button className="default-btn">Make Default</button>
                                        </div>
                                        <button className="edit-btn">Edit</button>
                                    </div>
                                </li>
                            </ul>
                            <button className="add-btn">+ Add New Address</button>
                            <div className="d-flex align-items-center justify-content-between">
                                <button className="cancel-btn">Cancel</button>
                                <button className="save-btn">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="info-list">
                    <li>
                        <img src={require("../../assets/img/mdi_account.svg")} alt="" />
                        <span className="name">{account.accountData?.given_name + ' ' + account.accountData?.family_name}</span>
                        <span className="default">Default</span>
                    </li>
                    <li>
                        <img src={require("../../assets/img/mdi_map-marker.svg")} alt="" />
                        <span>{account.accountData?.address}</span>
                    </li>
                    <li>
                        <img src={require("../../assets/img/mdi_phone.svg")} alt="" />
                        <span>{account.accountData?.phone_number}</span>
                    </li>
                    <li>
                        <img src={require("../../assets/img/mdi_email.svg")} alt="" />
                        <span>{account.accountData?.email}</span>
                    </li>
                </ul>
            </div>
            <div className="customer-info">
                <div className="d-flex align-items-center justify-content-between title-container m-0">
                    <h1 className="title m-0">Billing Address</h1>
                    <div className="toggle">
                        <button className="main-edit-btn" type="button" data-toggle="collapse" data-target="#infosCollapse2" aria-expanded="false" aria-controls="infosCollapse2">
                            <img src={Edit} alt="" />
                        </button>
                        <div className="toggle-menu collapse" id="infosCollapse2">
                            <ul className="infos-list">
                                <li>
                                    <div className="indicator active">
                                        <div className="center"></div>
                                    </div>
                                    <div className="d-flex align-items-center info-container">
                                        <div className="info">
                                            <div className="d-flex align-items-center name">John Doe <div className="default">Default</div></div>
                                            <p>74 Williams St., Laurel, MD 20707</p>
                                            <p>123456789</p>
                                            <p>johndoe@gmail.com</p>
                                        </div>
                                        <button className="edit-btn">Edit</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="indicator">
                                        <div className="center"></div>
                                    </div>
                                    <div className="d-flex align-items-center info-container">
                                        <div className="info">
                                            <div className="d-flex align-items-center name">John Doe</div>
                                            <p>74 Williams St., Laurel, MD 20707</p>
                                            <p>123456789</p>
                                            <p>johndoe@gmail.com</p>
                                            <button className="default-btn">Make Default</button>
                                        </div>
                                        <button className="edit-btn">Edit</button>
                                    </div>
                                </li>
                            </ul>
                            <button className="add-btn">+ Add New Address</button>
                            <div className="d-flex align-items-center justify-content-between">
                                <button className="cancel-btn">Cancel</button>
                                <button className="save-btn">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" id="sameAddress" name="sameAddress" value="true" />
                    <label for="sameAddress">Same as shipping address</label>
                </div>
                <ul className="info-list">
                    <li>
                        <img src={require("../../assets/img/mdi_account.svg")} alt="" />
                        <span className="name">{account.accountData?.given_name + ' ' + account.accountData?.family_name}</span>
                        <span className="default">Default</span>
                    </li>
                    <li>
                        <img src={require("../../assets/img/mdi_map-marker.svg")} alt="" />
                        <span>{account.accountData?.address}</span>
                    </li>
                    <li>
                        <img src={require("../../assets/img/mdi_phone.svg")} alt="" />
                        <span>{account.accountData?.phone_number}</span>
                    </li>
                    <li>
                        <img src={require("../../assets/img/mdi_email.svg")} alt="" />
                        <span>{account.accountData?.email}</span>
                    </li>
                </ul>
            </div>
        </>
    )
}