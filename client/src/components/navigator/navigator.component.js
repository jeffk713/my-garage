import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Link from '../link/link.component';

import { userSignOutStartAsync } from '../../redux/user/user.actions';
import { selectIsAuth } from '../../redux/user/user.selectors';

import './navigator.styles.scss';

const Navigator = ({ isAuth, userSignOutStartAsync }) => {
  const handleUserSignOut = async () => {
    const signOutSuccess = userSignOutStartAsync();
    if(!signOutSuccess) {
      return console.error('ERROR UPON SIGN-OUT')
    }
  };

  return (
    <div className='navigator'>
      <div className='logo'>
        <a href='/'>
          <h1>LOGO</h1>
        </a>
      </div>
      <div className='link-container'>
        <Link linkName='My Page' urlToGo='/my-page' linkStyle=' nav-link' />
        <Link linkName='Shops' urlToGo='/shops' linkStyle='nav-link' />
        {isAuth ? (
          <div className='sign-out-link' onClick={handleUserSignOut}>
            Sign Out
          </div>
        ) : (
          <Link linkName='Sign In' urlToGo='/sign-in' linkStyle='nav-link' />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
});

const mapDispatchToProps = dispatch => ({
  userSignOutStartAsync: () => dispatch(userSignOutStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
