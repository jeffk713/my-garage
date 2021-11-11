import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import axios from 'axios';

import Link from '../link/link.component';

import {
  userSignOutSuccess,
  userSignOutFailure,
} from '../../redux/user/user.actions';
import { selectIsAuth } from '../../redux/user/user.selectors';

import './navigator.styles.scss';

const Navigator = ({ isAuth, userSignOutSuccess, userSignOutFailure }) => {
  const userSignOut = async () => {
    try {
      await axios.get('/api/user/sign-out');
      userSignOutSuccess();
    } catch (err) {
      console.error('ERROR UPON SIGN OUT:', err.message);
      userSignOutFailure();
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
          <div className='sign-out-link' onClick={userSignOut}>
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
  userSignOutSuccess: () => dispatch(userSignOutSuccess()),
  userSignOutFailure: () => dispatch(userSignOutFailure()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
