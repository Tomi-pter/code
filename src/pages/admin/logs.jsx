import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
import fuzzysort from "fuzzysort";

import "../../assets/js/flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { getOrderLogs } from "../../actions/admin";

import ReactPaginate from "react-paginate";

export default (props) => {
  const admin = useSelector((state) => state.admin);
  const [search, setSearch] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [dateChange, setDateChange] = useState(false);
  const startDate = useRef();
  const endDate = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 10;
  const numPages = Math.ceil(filteredLogs.length / productPerPage);
  let totalInPage = currentPage * productPerPage;
  let startCount = 1;
  if (currentPage > 1) startCount = (currentPage - 1) * productPerPage + 1;
  if (currentPage === numPages) totalInPage = filteredLogs.length;

  const dispatch = useDispatch();

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handlePageClick = (data) => {
    let p = data.selected + 1;
    setCurrentPage(p);
  };

  const renderLogs = () => {
    let rows = [];
    for (
      let i = (currentPage - 1) * productPerPage;
      i < currentPage * productPerPage && i < filteredLogs.length;
      i++
    ) {
      let log = filteredLogs[i];
      rows.push(
        <tr key={`log${i}`}>
          <td>{log.obj.companyName}</td>
          <td>{log.obj.email}</td>
          <td>{log.obj.role}</td>
          <td>{formatDate(log.obj.dateOrdered)}</td>
          <td>{log.obj.discount}</td>
          <td>{log.obj.subTotal}</td>
          <td>{log.obj.shippingFee}</td>
          <td>{log.obj.total}</td>
        </tr>
      );
    }
    return rows;
  };

  const formatDate = (date) => {
    let newDate = new Date(date);
    newDate = moment(newDate).format("YYYY-MM-DD");
    return newDate;
  };

  useEffect(() => {
    if (admin.logs && admin.logs.length > 0) {
      let logs, searchResult, changeTimer, fromDate, toDate;

      logs = admin.logs;
      fromDate = startDate.current.value;
      toDate = endDate.current.value;

      changeTimer = setTimeout(() => {
        if (fromDate !== "" || toDate !== "") {
          logs = logs.filter((log) => {
            let dateOrdered = new Date(log.dateOrdered);
            dateOrdered = moment(dateOrdered).format("YYYY-MM-DD");

            let equalStart = dateOrdered === fromDate;
            let equalEnd = dateOrdered === toDate;
            let between = moment(dateOrdered).isBetween(fromDate, toDate);

            if (equalStart || equalEnd || between) {
              return log;
            }
          });
        }

        searchResult = logs.sort((a, b) => {
          return new Date(b.dateOrdered) - new Date(a.dateOrdered);
        });

        searchResult = fuzzysort.go(search, logs, {
          keys: ["companyName", "email", "role"],
          all: true,
        });

        setCurrentPage(1);
        setFilteredLogs(searchResult);
      }, 1000);

      return () => {
        clearTimeout(changeTimer);
      };
    }
  }, [admin, search, dateChange]);

  useEffect(() => {
    dispatch(getOrderLogs());
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center admin-pages">
      <div className="card container">
        <div className="d-flex align-items-center justify-content-between mb-4 header">
          <h2 className="m-0">Logs</h2>
          <div
            className="filter-container d-flex align-items-center"
            style={{ width: "80%" }}
          >
            <div className="search-container input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Search
                </span>
              </div>
              <input
                className="form-control"
                type="text"
                name="search"
                value={search}
                placeholder="Company/email/role"
                onChange={handleSearchChange}
                autoComplete="off"
              />
            </div>
            <div className="input-group ml-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Date Ordered</span>
              </div>
              <input
                ref={startDate}
                type="text"
                className="form-control"
                placeholder="From"
                data-toggle="flatpickr"
              />
              <input
                ref={endDate}
                type="text"
                className="form-control"
                placeholder="To"
                data-toggle="flatpickr"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    startDate.current.value = "";
                    endDate.current.value = "";
                    setDateChange(!dateChange);
                  }}
                >
                  Clear
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setDateChange(!dateChange)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-container custom-logs">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Date Ordered</th>
                <th scope="col">Discount</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Shipping Fee</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>{renderLogs()}</tbody>
          </table>
        </div>
        <div className="pagination-logs">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={numPages}
            onPageChange={handlePageClick}
            containerClassName={
              filteredLogs.length <= productPerPage
                ? "pagination empty"
                : "pagination"
            }
            activeClassName={"active"}
            forcePage={parseInt(currentPage) - 1}
          />
        </div>
      </div>
    </div>
  );
};
