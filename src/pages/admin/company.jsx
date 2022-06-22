import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { SubAccount } from "./subAccount";
import { CustomPrice } from "./customPrice";

export default (props) => {
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  const [mainCompany, setMainCompany] = useState(null);

  const history = useHistory;
  const location = useLocation();

  const handleSetData = (users) => {
    let mainCompany = users.filter(
      (user) => user.awsNetsuiteId === id && !user.subAccount
    );
    setMainCompany(mainCompany[0]);
  };

  useEffect(() => {
    admin?.users ? handleSetData(admin.users) : history.push("/admin");
  }, [location]);

  useEffect(() => {
    !admin.users && history.push("/admin");
  }, []);

  useEffect(
    () => () => {
      window.onunload = () => {
        localStorage.removeItem("admin");
      };
    },
    []
  );

  return (
    <div className="d-flex align-items-center justify-content-center admin-pages">
      <div className="card container">
        <div className="d-flex align-items-center justify-content-between mb-4 header">
          <Link to={`/admin`}>{"< Back"}</Link>
          <h2 className="m-0">{mainCompany && `${mainCompany.company}`}</h2>
          <div></div>
        </div>

        <ul class="nav nav-tabs justify-content-center">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#sub-accounts">
              Sub Accounts
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#custom-prices">
              Custom Prices
            </a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane container active" id="sub-accounts">
            <SubAccount mainCompany={mainCompany} />
          </div>
          <div class="tab-pane container fade" id="custom-prices">
            <CustomPrice mainCompany={mainCompany} />
          </div>
        </div>
      </div>
    </div>
  );
};
