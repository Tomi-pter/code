import React from 'react';
import Logo from '../../assets/img/logo.svg';
import PPLogo from '../../assets/img/pp-logo.svg';
export const Header = () => {
  return (
    <nav className="navbar header-login header">
      <a href={process.env.REACT_APP_HOMEPAGE_URL}>
        <img className="logo" src={PPLogo} width="152.25" height="46.49" alt="" />
      </a>
    </nav>
  );
};
