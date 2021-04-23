import React from 'react';

export default props => {
    return (
        <div>
            <label>Discount Code</label>
            <input className="w-100" type="text" placeholder="" />
            <button>Apply</button>
            <span>Error</span>
        </div>
    )
}