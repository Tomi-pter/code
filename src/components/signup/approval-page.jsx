import React from "react";
import { HeaderNav } from "../partials/HeaderNav";
import { Footer } from "../partials/Footer";
import AccountSuccessImg from "../../assets/img/Account/account-success.png";
const ApprovalPage = () => {
  return (
    <>
      <HeaderNav />
      <div className="d-flex align-items-center justify-content-center approval-page">
        <div>
          <div className="d-flex flex-column align-items-center justify-content-center card">
            {/* <img src={AccountSuccessImg} alt="" /> */}
            <h2>Thank you for registering!</h2>
            <p>
              We have a quick verification process to complete. Once done, we'll
              send you a confirmation email to the address provided.
            </p>
            <a
              href={process.env.REACT_APP_HOMEPAGE_URL}
              className="primaryButton"
            >
              BACK TO HOMEPAGE
            </a>
          </div>
          {/* <div className="buttonWrapper d-flex align-items-center justify-content-center"></div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApprovalPage;
