import React, {useEffect} from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAccount } from '../../actions/account';

export default props => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);

    useEffect(()=>{
        dispatch(getAccount(user?.email));
    },[dispatch]);

    return (
        <div>
            <h1 className="order-title">Shipping and Billing</h1>
            <div className="row align-items-start" style={{ flex: "0" }}>
            <div className="col-lg-12 shipping-container">
                <div className="d-flex align-items-center name-wrapper">
                    <div>
                        <span className="mr-3"><img src={require("../../assets/img/mdi_account.svg")} /></span>
                    </div>
                    <div>
                        <p className="customer-name mb-0" style={{ maxWidth: "210px" }}>{account.accountData?.given_name + ' ' + account.accountData?.family_name}</p>
                    </div>
                    <div>
                        <span className="addressDefault">Default</span>
                    </div>
                </div>
                <div className="d-flex align-items-start address-wrapper">
                    <div>
                        <span className="mr-3"><img src={require("../../assets/img/mdi_map-marker.svg")} /></span>
                    </div>
                    <div>
                        <p className="customer-address mb-0" style={{ maxWidth: "210px" }}>{account.accountData?.address}</p>
                    </div>
                </div>
                <div className="d-flex align-items-start mobile-wrapper">
                    <div>
                        <span className="mr-3"><img src={require("../../assets/img/mdi_phone.svg")} /></span>
                    </div>
                    <div>
                        <p className="customer-phone mb-0">{account.accountData?.phone_number}</p>
                    </div>
                </div>
                <div className="d-flex align-items-start email-wrapper">
                    <div>
                        <span className="mr-3"><img src={require("../../assets/img/mdi_email.svg")} /></span>
                    </div>
                    <div>
                        <p className="customer-email mb-0" >{account.accountData?.email}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}