import React, { useState, useRef, useEffect } from 'react';
import ProfilePic from '../../assets/img/Account/placeholder-dp.svg';
import EditIcon from '../../assets/img/Account/edit-icon.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getAvatar, postAvatar, putAccount } from '../../actions/account';

export const Addresses = ({ account }) => {
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
            <h2 className="sub-title">Shipping Address</h2>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="address">Address</label>
                        <input
                            name="address"
                            type="text"
                            defaultValue={account.accountData?.address || ''}
                            
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
                            
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}