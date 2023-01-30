import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { SubAccount } from "./subAccount";
import { CustomPrice } from "./customPrice";

export default (props) => {
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  const [mainCompany, setMainCompany] = useState(null);

  const history = useHistory();
  const location = useLocation();

  const handleSetData = (users) => {
    let mainCompany = users.filter(
      (user) => user.awsNetsuiteId === id && !user.subAccount
    );
    if (!mainCompany[0]) history.push("/admin/companies");
    setMainCompany(mainCompany[0]);
  };

  useEffect(() => {
    handleSetData(admin.users);
  }, [location]);

  return (
    <div className="d-flex align-items-center justify-content-center admin-pages">
      <div className="card container">
        <div className="d-flex align-items-center justify-content-between mb-4 header">
          <Link to={`/admin/companies`}>{"< Back"}</Link>
          <h2 className="m-0">{mainCompany && `${mainCompany.company}`}</h2>
          <div></div>
        </div>

        <ul className="nav nav-tabs justify-content-center">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#sub-accounts"
            >
              Sub Accounts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#custom-prices">
              Custom Prices
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane container active" id="sub-accounts">
            <SubAccount mainCompany={mainCompany} />
          </div>
          <div className="tab-pane container fade" id="custom-prices">
            <CustomPrice mainCompany={mainCompany} />
          </div>
        </div>
      </div>
    </div>
  );
};
