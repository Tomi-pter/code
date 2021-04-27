import React, {useEffect} from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAccount } from '../../actions/account';

export default props => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('profile'));
        dispatch(getAccount(user?.username));
    },[dispatch]);

    return (
        <div className="customer-info">
            <h1 className="title">Shipping and Billing</h1>
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
    )
}