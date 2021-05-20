import React, { useState, useRef, useEffect } from 'react';
import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import EditIcon from '../../assets/img/Account/edit-icon.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getAvatar, postAvatar, putAccount, getAccount } from '../../actions/account';
import { Alert, Button } from 'react-bootstrap';

export const PersonalInfo = ({ account, disable, setDisable }) => {
    const [showError, setShowError] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [profileImage, setProfileImage] = useState("");
    const [image, setImage] = useState("");
    const [initialData, setInitialData] = useState("");
    const [formData, updateFormData] = useState('');
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const updateInfo = useSelector((state) => state.account.updatedAccountData);
    const avatar = useSelector((state) => state.account.avatarData);
    const handleChange = (e) => {
        e.preventDefault()
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        dispatch(putAccount(user?.username, formData))
        if (updateInfo) {
            dispatch(getAccount(user?.username));
        }
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
            const fileSize = files[0].size;
            const fileKB = fileSize / 1024;
            if (fileKB.toFixed(2) < 1000) {
                const filename = files[0].name;
                var parts = filename.split(".");
                const fileType = parts[parts.length - 1];
                saveAvatar.append('file', files[0], filename);
                xhr.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        if (percentComplete == 100) {
                            setAvatarLoading(false);
                            dispatch(getAvatar(user?.username));
                        }
                    }
                };
                console.log(fileKB.toFixed(2) + "KB");
                xhr.timeout = 5000;
                xhr.open("POST", 'https://premierpharmastaging.outliant.com/user/' + user?.username + '/photo');
                xhr.send(saveAvatar);
                setSuccess(true);
                setShowError(false);
            } else {
                setShowError(true);
                setAvatarLoading(false);
            }

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
        if (success) {
            dispatch(getAvatar(user?.username));
        }
        fetch(`https://premierpharmastaging.outliant.com/user/${user?.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then(response => response.json())
            .then(data => {
                updateFormData({
                    'given_name': data.given_name,
                    'family_name': data.family_name,
                    'phone_number': data.phone_number,
                    'company': data['custom:company']
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        if (updateInfo) {
            dispatch(getAccount(user?.username));
        }
    }, [updateInfo])
    useEffect(() => {
        
    }, [account, avatar])
    useEffect(() => {
        dispatch(getAccount(user?.username));
        dispatch(getAvatar(user?.username));
    }, [])

    return (
        <>
            <Alert variant="danger" show={showError} onClose={() => setShowError(false)} dismissible >
                <p style={{ margin: 0 }}>
                    This file is too large to upload. The maximum supported file size are: 1MB.
                </p>
            </Alert>
            <div className="d-flex align-items-center justify-content-between profile-container">
                <div className="d-flex align-items-center">
                    <div className="avatar-wrapper position-relative">
                        {avatarLoading ? (
                            <div id="loading-circle-container">
                                <div className="avatar-loader ">
                                </div>
                                <img className="profilePic mr-4" src={`data:image/jpeg;base64,${encodeData(avatar?.Body?.data)}`} />
                            </div>
                        ) : (
                                account.avatarData?.Body?.data.length > 0 ?
                                    <img className="profilePic mr-4" src={`data:image/jpeg;base64,${encodeData(avatar?.Body?.data)}`} />
                                    : <img className="profilePic mr-4" src={ProfilePic} alt="" />
                            )}
                    </div>
                    <div>
                        <p className="mb-0 name"> {account.accountData?.given_name + ' ' + account.accountData?.family_name} </p>
                        <small>{account.accountData?.email}</small>
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