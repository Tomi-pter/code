import React from 'react';

export default props => {
    return (
        <div className="discount-container">
            <label>Discount Code</label>
            <div className="input-container">
                <input type="text" placeholder="" />
                <button>Apply</button>
                <div className="icon-container">
                    {/* <img src={require("../../assets/icon/check-green.svg")} alt="" /> */}
                    <img src={require("../../assets/icon/x-red.svg")} alt="" />
                </div>
            </div>
            <span className="msg error">Error</span>
        </div>
    )
}