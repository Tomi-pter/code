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
    const [avatarLoading, setAvatarLoading] = useState(false);
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
    const handleFileUpload = e => {
        setAvatarLoading(true);
        const { files } = e.target;
        const saveAvatar = new FormData();
        let xhr = new XMLHttpRequest();
        if (files && files.length) {
            const filename = files[0].name;
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            saveAvatar.append('file', files[0], filename);
            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    var percentComplete = (e.loaded / e.total) * 100;
                    console.log(percentComplete);
                    if (percentComplete == 100) {
                        setAvatarLoading(false);
                    }
                }
            };
            xhr.timeout = 5000;
            xhr.open("POST", 'https://premierpharmastaging.outliant.com/user/' + user?.username + '/photo');
            xhr.send(saveAvatar);
        }


    };
    const encodeData = (buffer) => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    const toggleEdit = () => {
        setDisable(!disable);
        console.log(disable);
    }
    const onButtonClick = () => {
        inputFile.current.click();
    };
    useEffect(() => {
        dispatch(getAvatar(user?.username));
        if (account.avatarData?.Body?.data.length > 0) {
            setImage(account.avatarData?.Body?.data);
        }
    }, [account]);

    return (
        <>
            <div className="d-flex align-items-center justify-content-between profile-container">
                <div className="d-flex align-items-center">
                    <div className="avatar-wrapper position-relative">
                        {avatarLoading ? (
                            <div id="loading-circle-container">
                                <div className="avatar-loader ">
                                </div>
                                <img className="profilePic mr-4" src={`data:image/jpeg;base64,${encodeData(account.avatarData?.Body?.data)}`} />
                            </div>
                        ) : (
                                account.avatarData?.Body?.data.length > 0 ?
                                    <img className="profilePic mr-4" src={`data:image/jpeg;base64,${encodeData(account.avatarData?.Body?.data)}`} />
                                    : <img className="profilePic mr-4" src={ProfilePic} alt="" />
                            )}
                    </div>
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
            {/* <div className="row">
                <button onClick={handleSubmit}>Save</button>
            </div> */}
        </>
    )
}