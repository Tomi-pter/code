import React from 'react';
import { Link } from 'react-router-dom';

export const SideBar = () => {
  return (
    <nav
      class='navbar navbar-vertical fixed-left navbar-expand-md navbar-light'
      id='sidebar'
    >
      <div class='container-fluid'>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#sidebarCollapse'
          aria-controls='sidebarCollapse'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>

        <a class='navbar-brand' href='/'>
          <img
            src='img/logo.svg'
            class='navbar-brand-img 
      mx-auto'
            alt='...'
          />
        </a>

        <div class='navbar-user d-md-none'>
          <div class='dropdown'>
            <a
              href='#'
              id='sidebarIcon'
              class='dropdown-toggle'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <div class='avatar avatar-sm avatar-online'>
                <img
                  src='img/avatars/profiles/avatar-1.jpg'
                  class='avatar-img rounded-circle'
                  alt='...'
                />
              </div>
            </a>

            <div
              class='dropdown-menu dropdown-menu-right'
              aria-labelledby='sidebarIcon'
            >
              <a href='#' class='dropdown-item'>
                Profile
              </a>
              <a href='#' class='dropdown-item'>
                Settings
              </a>
              <hr class='dropdown-divider' />
              <a href='/login' class='dropdown-item'>
                Logout
              </a>
            </div>
          </div>
        </div>

        <div class='collapse navbar-collapse' id='sidebarCollapse'>
          <form class='mt-4 mb-3 d-md-none'>
            <div class='input-group input-group-rounded input-group-merge'>
              <input
                type='search'
                class='form-control form-control-rounded form-control-prepended'
                placeholder='Search'
                aria-label='Search'
              />
              <div class='input-group-prepend'>
                <div class='input-group-text'>
                  <span class='fe fe-search'></span>
                </div>
              </div>
            </div>
          </form>

          <ul class='navbar-nav'>
            <li class='nav-item'>
              <Link class='nav-link' to='/'>
                <i class='fe fe-grid'></i> Dashboard
              </Link>
            </li>
          </ul>

          <hr class='navbar-divider my-3' />

          {/* <h6 class='navbar-heading'>Documentation</h6>

          <ul class='navbar-nav'>
            <li class='nav-item'>
              <Link class='nav-link' to='/components'>
                <i class='fe fe-book-open'></i> Components
              </Link>
            </li>
          </ul> */}

          <div class='mt-auto'></div>

          <div
            class='navbar-user d-none d-md-flex'
            id='sidebarUser'
            v-if="navposition == 'sidebar'"
          >
            <a
              href='#sidebarModalActivity'
              class='navbar-user-link'
              data-toggle='modal'
            >
              <span class='icon'>
                <i class='fe fe-bell'></i>
              </span>
            </a>

            <div class='dropup'>
              <a
                href='#'
                id='sidebarIconCopy'
                class='dropdown-toggle'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <div class='avatar avatar-sm avatar-online'>
                  <img
                    src='img/avatars/profiles/avatar-1.jpg'
                    class='avatar-img rounded-circle'
                    alt='...'
                  />
                </div>
              </a>

              <div class='dropdown-menu' aria-labelledby='sidebarIconCopy'>
                <a href='#' class='dropdown-item'>
                  Profile
                </a>
                <a href='#' class='dropdown-item'>
                  Settings
                </a>
                <hr class='dropdown-divider' />
                <a href='/login' class='dropdown-item'>
                  Logout
                </a>
              </div>
            </div>

            <a
              href='#sidebarModalSearch'
              class='navbar-user-link'
              data-toggle='modal'
            >
              <span class='icon'>
                <i class='fe fe-search'></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
