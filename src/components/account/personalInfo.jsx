import React, { useState, useRef, useEffect } from "react";
import ProfilePic from "../../assets/img/Account/placeholder-dp.svg";
import EditIcon from "../../assets/img/Account/edit-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  getAvatar,
  putAccount,
  getAccount,
  updateEmail,
} from "../../actions/account";
import { Alert } from "react-bootstrap";
import InputContact from "react-phone-number-input/input";

const defaultFormData = {
  given_name: "",
  family_name: "",
  phone_number: "",
  company: "",
};

export const PersonalInfo = ({ account }) => {
  const [showError, setShowError] = useState(false);
  const [disable, setDisable] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [formData, updateFormData] = useState(defaultFormData);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPic, setAvatarPic] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const inputFile = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactChange = (value) => {
    updateFormData({ ...formData, phone_number: value });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    dispatch(putAccount(user?.username, formData));
  };

  const handleFileUpload = (e) => {
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
        saveAvatar.append("file", files[0], filename);
        xhr.upload.onprogress = function (e) {
          if (e.lengthComputable) {
            var percentComplete = (e.loaded / e.total) * 100;
            if (percentComplete == 100) {
              dispatch(getAvatar(user?.username));
            }
          }
        };
        xhr.timeout = 5000;
        xhr.open(
          "POST",
          `${process.env.REACT_APP_BACKEND_URL}/user/` +
            user?.username +
            "/photo"
        );
        xhr.send(saveAvatar);
        setShowError(false);
      } else {
        setShowError(true);
        setAvatarLoading(false);
      }
    }
  };

  const toggleEdit = () => {
    setDisable(!disable);
    updateFormData({
      given_name: account?.accountData?.given_name,
      family_name: account?.accountData?.family_name,
      phone_number: account?.accountData?.phone_number,
      company: account?.accountData["custom:company"],
    });
  };

  const toggleCancel = () => {
    setDisable(!disable);
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const disableEmailSave = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail) && !isLoading
      ? false
      : true;
  };

  const handleSaveNewEmail = () => {
    setIsLoading(true);
    dispatch(updateEmail(user?.username, { newEmail }));
  };

  useEffect(() => {
    setDisable(true);
    setIsLoading(false);
    document.getElementById("emailChangeModalClose").click();
    if (account?.avatarData && !Array.isArray(account?.avatarData))
      setAvatarPic(account?.avatarData);
  }, [account]);

  useEffect(() => {
    setAvatarLoading(false);
  }, [avatarPic]);

  useEffect(() => {
    // dispatch(getAccount(user?.username));
    dispatch(getAvatar(user?.username));
  }, [dispatch]);

  return (
    <>
      <Alert
        variant="danger"
        show={showError}
        onClose={() => setShowError(false)}
        dismissible
      >
        <p style={{ margin: 0 }}>
          This file is too large to upload. The maximum supported file size are:
          1MB.
        </p>
      </Alert>
      <div className="d-flex align-items-center justify-content-between profile-container">
        <div className="d-flex align-items-center">
          <div className="avatar-wrapper position-relative">
            {avatarLoading && <div className="avatar-loader "></div>}
            {avatarPic !== "" ? (
              <img className="profilePic mr-4" src={avatarPic} />
            ) : (
              <img className="profilePic mr-4" src={ProfilePic} alt="" />
            )}
          </div>
          {account.accountData.given_name && (
            <div>
              <p className="mb-0 name">
                {account.accountData?.given_name +
                  " " +
                  account.accountData?.family_name}{" "}
              </p>
              {account.accountData.subAccount ? (
                <small
                  className="d-flex align-items-center"
                  data-toggle="modal"
                  data-target="#emailChangeModal"
                >
                  {account.accountData?.email}
                </small>
              ) : (
                <small
                  className="d-flex align-items-center"
                  data-toggle="modal"
                  data-target="#emailChangeModal"
                  onClick={() => setNewEmail(account.accountData?.email)}
                >
                  {account.accountData?.email}

                  <img
                    className="ml-2"
                    src={EditIcon}
                    alt=""
                    width="13"
                    height="13"
                  />
                </small>
              )}

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
          )}
        </div>
        {account.accountData.given_name && (
          <div className="edit-wrapper" onClick={toggleEdit}>
            <img className="edit-icon" src={EditIcon} alt="" />
          </div>
        )}
      </div>
      <h2 className="sub-title">Account Information</h2>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group d-flex flex-column">
            <label htmlFor="given_name">First Name</label>
            {disable ? (
              <p>{account?.accountData?.given_name}</p>
            ) : (
              <input
                value={formData?.given_name}
                name="given_name"
                type="text"
                onChange={handleChange}
              />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group d-flex flex-column">
            <label htmlFor="family_name">Last Name</label>
            {disable ? (
              <p>{account?.accountData?.family_name}</p>
            ) : (
              <input
                name="family_name"
                type="text"
                value={formData?.family_name}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group d-flex flex-column">
            <label htmlFor="phone_number">Mobile Number</label>
            {disable ? (
              <p>{account?.accountData?.phone_number}</p>
            ) : (
              // <input
              //     name="phone_number"
              //     type="text"
              //     value={formData?.phone_number}
              //     onChange={handleChange}
              // />
              <InputContact
                country="US"
                international
                withCountryCallingCode
                value={formData?.phone_number}
                className="form-control"
                onChange={contactChange}
              />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group d-flex flex-column">
            <label htmlFor="company">Company Name</label>
            {disable ? (
              <p>{account?.accountData["custom:company"]}</p>
            ) : (
              <input
                name="company"
                type="text"
                value={formData?.company}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      </div>
      {!disable && (
        <div className="row  align-items-center justify-content-end">
          <button
            className="cancelButton"
            onClick={toggleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="saveButton"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      )}
      <div
        className="modal fade"
        id="emailChangeModal"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Change Email
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="emailChangeModalClose"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group d-flex flex-column">
                <label htmlFor="email">Email</label>
                <input
                  value={newEmail}
                  name="newEmail"
                  type="email"
                  onChange={handleEmailChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary float-right saveButton"
                onClick={handleSaveNewEmail}
                disabled={disableEmailSave()}
              >
                {isLoading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
