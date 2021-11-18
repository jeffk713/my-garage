import React, { useState } from 'react';
import { connect } from 'react-redux';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Link from '../../link/link.component';
import Banner from '../../banner/banner.component';

import { userSignInStartAsync } from '../../../redux/user/user.actions';
import { getUserVehiclesStartAsync } from '../../../redux/vehicle/vehicle.actions';

import './sign-in.styles.scss';

const INITIAL_INPUT = {
  email: '',
  password: '',
};

const SignInPage = ({
  userSignInStartAsync,
  getUserVehiclesStartAsync,
  history,
}) => {
  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { email, password } = inputState;

  const handleSubmit = async e => {
    e.preventDefault();
    const authUserObj = await userSignInStartAsync(email, password);

    setInputState({ ...INITIAL_INPUT });

    await getUserVehiclesStartAsync(authUserObj.userId);

    history.push('/my-page');
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  return (
    <div className='sign-in-page'>
      <Banner>Welcome Back, Please Sign In!</Banner>
      <form onSubmit={handleSubmit}>
        <div className='sign-in-input-container'>
          <InputBox
            label='Email'
            type='text'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
          <InputBox
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <CustomButton type='submit' locatedIn='btn-in-sign-in-page'>
          Sign In
        </CustomButton>
      </form>
      <Link
        linkStyle='inline-link'
        linkName='Sign up here!'
        urlToGo='/sign-up'
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  userSignInStartAsync: (email, password) =>
    dispatch(userSignInStartAsync(email, password)),
  getUserVehiclesStartAsync: userId =>
    dispatch(getUserVehiclesStartAsync(userId)),
});

export default connect(null, mapDispatchToProps)(SignInPage);
