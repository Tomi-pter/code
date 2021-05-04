import React, { useState, useRef, useEffect } from 'react';
import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import EditIcon from '../../assets/img/Account/edit-icon.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getAvatar, postAvatar, putAccount } from '../../actions/account';

export const PersonalInfo = ({ account, disable, setDisable }) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    const [image, setImage] = useState("");
    const [initialData, setInitialData] = useState("");
    const [formData, updateFormData] = useState('');
    const handleChange = (e) => {
        e.preventDefault()
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        dispatch(putAccount(user?.username, formData))
    };
    const inputFile = useRef(null);
    const dispatch = useDispatch();
    
    const avatar = useSelector((state) => state.avatar);
    const handleFileUpload = e => {
        const { files } = e.target;
        const saveAvatar = new FormData();
        if (files && files.length) {
            const filename = files[0].name;
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            for (const file of files) {
                saveAvatar.append('file[]', file, file.name);
            }
            setImage(saveAvatar);
            console.log(saveAvatar);
            dispatch(postAvatar(user?.username, saveAvatar));
        }
    };
    const toggleEdit = () => {
        setDisable(!disable);
        console.log(disable);
    }
    const onButtonClick = () => {
        inputFile.current.click();
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-between profile-container">
                <div className="d-flex align-items-center">
                    <img className="profilePic mr-4" src={ProfilePic} alt="" />
                    <div>
                        <p className="mb-0 name"> {account.accountData?.given_name + ' ' + account.accountData?.family_name} </p>
                        <input
                            style={{ display: "none" }}
                            // accept=".zip,.rar"
                            ref={inputFile}
                            onChange={handleFileUpload}
                            type="file"
                            accept="image/*"
                        />
                        <div className="change-btn" onClick={onButtonClick}>
                            Change Profile Photo
                        </div>
                    </div>
                </div>
                <div className="edit-wrapper" onClick={toggleEdit}>
                    <img className="edit-icon" src={EditIcon} alt="" />
                </div>
            </div>
            <h2 className="sub-title">Account Information</h2>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="given_name">First Name</label>
                        <input
                            defaultValue={account.accountData?.given_name || ''}
                            name="given_name"
                            type="text"
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="family_name">Last Name</label>
                        <input
                            name="family_name"
                            type="text"
                            defaultValue={account.accountData?.family_name || ''}
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="email">E-mail Address</label>
                        <input
                            name="email"
                            type="email"
                            defaultValue={account.accountData?.email || ''}
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="phone_number">Mobile Number</label>
                        <input
                            name="phone_number"
                            type="text"
                            defaultValue={account.accountData?.phone_number || ''}
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="company">Company Name</label>
                        <input
                            name="company"
                            type="text"
                            defaultValue={account.accountData?.['custom:company'] || ''}
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <h2 className="sub-title">Shipping Address</h2>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="address">Address</label>
                        <input
                            name="address"
                            type="text"
                            defaultValue={account.accountData?.address || ''}
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="city">City</label>
                        <input
                            name="city"
                            type="text"
                            defaultValue={account.accountData?.['custom:city'] || ''}
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="state">State</label>
                        <input
                            name="state"
                            type="text"
                            defaultValue={account.accountData?.['custom:state'] || ''}
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="postal_code">Postal Code</label>
                        <input
                            name="postal_code"
                            type="text"
                            defaultValue={account.accountData?.['custom:postal_code'] || ''}
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <button onClick={handleSubmit}>Save</button>
            </div>
        </>
    )
}