import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/img/logo.svg';

export const Header = () => {
  return (
    <nav className="navbar fixed-top mb-0 header">
        <NavLink className='nav-link' to='/'>
            <img className="logo" src={Logo} width="203" height="62" alt="" />
        </NavLink>
    </nav>
  );
};
