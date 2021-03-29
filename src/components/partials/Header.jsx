import React from 'react';
import Logo from '../../assets/img/logo.svg';

export const Header = () => {
  return (
    <nav className="navbar fixed-top mb-0 header">
      <a href="http://premierpharma.wpengine.com/">
        <img className="logo" src={Logo} width="203" height="62" alt="" />
      </a>
    </nav>
  );
};
