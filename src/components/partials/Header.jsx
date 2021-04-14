import React from 'react';
import Logo from '../../assets/img/logo.svg';
import PPLogo from '../../assets/img/pp-logo.svg'
export const Header = () => {
  return (
    <nav className="navbar fixed-top mb-0 header">
      <a href="http://premierpharma.wpengine.com/">
        <img className="logo" src={PPLogo} width="203" height="62" alt="" />
      </a>
    </nav>
  );
};
