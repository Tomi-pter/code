import React, { useState, useEffect } from "react";
import EditIcon from "../../assets/img/Account/edit-icon.svg";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { putLicense } from "../../actions/account";

const defaultFormData = {
  stateLicenseNumber: "",
  stateLicenseExpirationDate: "",
  dea: "",
  deaExpiry: "",
};

export const License = ({ account }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [formData, updateFormData] = useState(defaultFormData);
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleDateChange = (date, dateString, name) => {
        let dateValue = moment(dateString).format('YYYY-MM-DD');

        if (date === null && dateString === '') {
            dateValue = ''
        }

        updateFormData({ ...formData, [name]: dateValue });
    };

  const handleSubmit = (e) => {
    setIsLoading(true);
    dispatch(putLicense(user?.username, formData));
  };

  const toggleEdit = () => {
    setDisable(!disable);
    updateFormData({
      stateLicenseNumber: account?.accountData?.stateLicenseNumber || "",
      stateLicenseExpirationDate:
        account?.accountData?.stateLicenseExpirationDate || "",
      dea: account?.accountData?.dea || "",
      deaExpiry: account?.accountData?.deaExpiry || "",
    });
  };

  const toggleCancel = () => {
    setDisable(!disable);
  };

  useEffect(() => {
    setDisable(true);
    setIsLoading(false);
  }, [account]);

  return (
    <>
      <div className="d-flex justify-content-between sub-title mb-4">
        <h2 className="m-0">State License Information</h2>
        <div className="edit-wrapper d-flex align-items-start justify-content-center" onClick={toggleEdit}>
            <img className="edit-icon" src={EditIcon} alt="" />
            <span>Edit Info</span>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group d-flex flex-column">
            <label htmlFor="stateLicenseNumber">State License Number</label>
            {disable ? (
              <p>{account?.accountData?.stateLicenseNumber || ""}</p>
            ) : (
              <input
                value={formData?.stateLicenseNumber}
                name="stateLicenseNumber"
                type="text"
                onChange={handleChange}
              />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group d-flex flex-column">
            <label htmlFor="stateLicenseExpirationDate">
              State License Expiration Date
            </label>
            {disable ? (
              <p>{account?.accountData?.stateLicenseExpirationDate || ""}</p>
            ) : (
                <DatePicker
                    value={
                        formData.stateLicenseExpirationDate !== ''
                            ? moment(formData.stateLicenseExpirationDate)
                            : ''
                    }
                    onChange={(date, dateString) =>{
                        handleDateChange(
                            date,
                            dateString,
                            "stateLicenseExpirationDate"
                        )
                    }}
                />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group d-flex flex-column">
            <label htmlFor="dea">DEA</label>
            {disable ? (
              <p>{account?.accountData?.dea || ""}</p>
            ) : (
              <input
                name="dea"
                type="text"
                value={formData?.dea}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group d-flex flex-column">
            <label htmlFor="deaExpiry">DEA Expiry</label>
            {
                disable
                ? <p>{account?.accountData?.deaExpiry || ''}</p>
                : <DatePicker
                    value={
                    formData.deaExpiry !== ''
                        ? moment(formData.deaExpiry)
                        : ''
                    }
                    onChange={(date, dateString) =>
                        handleDateChange(date, dateString, 'deaExpiry')
                    }
                />
            }
          </div>
        </div>
      </div>
      {
        !disable
        && <div className="d-flex flex-row align-items-center justify-content-start">
            <button
                className="saveButton"
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {
                    isLoading
                    ? <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    : <>
                        {"Save Changes"}
                    </>
                }
            </button>
            <button
                className="cancelButton ml-2"
                onClick={toggleCancel}
                disabled={isLoading}
            >
                Discard
            </button>
        </div>
      }
    </>
  );
};
