import React, { useState, useRef, useEffect } from 'react';
import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import EditIcon from '../../assets/img/Account/edit-icon.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getAvatar, postAvatar, putAccount, getAccount } from '../../actions/account';

export const PersonalInfo = ({ account, disable, setDisable }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [profileImage, setProfileImage] = useState("");
    const [image, setImage] = useState("");
    const [initialData, setInitialData] = useState("");
    const [formData, updateFormData] = useState('');
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [accountData, setAccountData] = useState("");
    const handleChange = (e) => {
        e.preventDefault()
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        dispatch(putAccount(user?.username, formData))
        dispatch(getAccount(user?.username));
        setDisable(!disable);
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
                        dispatch(getAvatar(user?.username))
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
    const toggleCancel = () => {
        setDisable(!disable);
    }
    const onButtonClick = () => {
        inputFile.current.click();
    };
    useEffect(() => {
        updateFormData({
            'given_name': account.accountData.given_name,
            'family_name': account.accountData.family_name,
            'phone_number': account.accountData.phone_number,
            'company': account.accountData['custom:company']
        });
        setAccountData(account.accountData);
    },[account])
    useEffect(() => {
        // this is only executed once
        dispatch(getAvatar(user?.username));
      }, [])

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
                        <p className="mb-0 name"> {accountData?.given_name + ' ' + accountData?.family_name} </p>
                        <small>{accountData?.email}</small>
                        <input
                            style={{ display: "none" }}
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
                            value={formData?.given_name}
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
                            value={formData?.family_name}
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/* <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="email">E-mail Address</label>
                        <input
                            name="email"
                            type="email"
                            value={account.accountData?.email || ''}
                            disabled={disable}
                            readOnly
                        />
                    </div>
                </div> */}
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="phone_number">Mobile Number</label>
                        <input
                            name="phone_number"
                            type="text"
                            value={formData?.phone_number}
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
                            value={formData?.['company']}
                            disabled={disable}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            {!disable ?
                <div className="row  align-items-center justify-content-end">
                    <div>
                        <button className="cancelButton" onClick={toggleCancel}>Cancel</button>
                    </div>
                    <div>
                        <button className="saveButton" onClick={handleSubmit}>Save</button>
                    </div>
                </div> : ''
            }
        </>
    )
}