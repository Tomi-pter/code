import React, { useState, useEffect } from "react";
import { getGroupPricing, createGroupPricing } from "../../actions/admin";
import { useSelector, useDispatch } from "react-redux";
import { Group } from "../../components/admin/group";

export default (props) => {
  const admin = useSelector((state) => state.admin);
  const [newGroupName, setNewGroupName] = useState("");
  const dispatch = useDispatch();

  const checkDuplicate = () => {
    let duplicate = null;

    if (admin.groupPricingList && newGroupName !== "") {
      duplicate = admin.groupPricingList.find(
        (group) => group.name === newGroupName
      );
    }

    return duplicate;
  };

  useEffect(() => {
    setNewGroupName("");
  }, [admin]);

  useEffect(() => {
    dispatch(getGroupPricing());
  }, []);

  return (
    <div className="card">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Group Pricing</h2>
      </div>
      <div className="row">
        <div className="col-3">
          <div className="d-flex flex-column h-100">
            <nav
              className="nav nav-pills flex-column mb-3"
              style={{
                flex: "auto",
                overflow: "auto",
                minHeight: "calc(100vh - 325px)",
                maxHeight: "calc(100vh - 325px)",
                flexWrap: "nowrap",
              }}
            >
              {admin.groupPricingList.map((group, index) => (
                <a
                  key={`group${index}`}
                  data-toggle="pill"
                  className={"nav-link " + (index === 0 ? "active" : "")}
                  href={`#group${index}`}
                >
                  {group.name}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              {checkDuplicate() && (
                <span className="text-danger">Group already exist.</span>
              )}
              <input
                className="form-control"
                type="text"
                placeholder="Group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <button
                className="btn btn-primary w-100 mt-3"
                disabled={newGroupName === "" || checkDuplicate()}
                onClick={() => {
                  const newGroupData = {
                    name: newGroupName,
                    pricingList: [],
                  };
                  dispatch(createGroupPricing(newGroupData));
                }}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="tab-content">
            {admin.groupPricingList.map((group, index) => (
              <Group group={group} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
