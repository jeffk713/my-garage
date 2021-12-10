import React from 'react';
import { connect } from 'react-redux';

import Link from '../link/link.component';

import { userSignOutStartAsync } from '../../redux/user/user.thunk-actions';

import Logo from '../../assets/images/logo-right.svg';
import './navigator.styles.scss';

const Navigator = ({ isAuth, userSignOutStartAsync }) => {
  const handleUserSignOut = async () => {
    const signOutSuccess = userSignOutStartAsync();
    if (!signOutSuccess) {
      return console.error('ERROR UPON SIGN-OUT');
    }
  };
  return (
    <div className='navigator'>
      <a href='/'>
        <img className='logo' src={Logo} alt='logo' />
      </a>
      <div className='link-container'>
        <Link linkName='My Page' urlToGo='/my-page' linkStyle=' nav-link' />
        <Link linkName='Shop' urlToGo='/shop' linkStyle='nav-link' />
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

const mapDispatchToProps = dispatch => ({
  userSignOutStartAsync: () => dispatch(userSignOutStartAsync()),
});

export default connect(null, mapDispatchToProps)(Navigator);
