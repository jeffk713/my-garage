import React, { useState } from 'react';
import { connect } from 'react-redux';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';

import { userSignUpStartAsync } from '../../../redux/user/user.actions';
import { triggerErrorBanner } from '../../../redux/error/error.actions';

import './sign-up.styles.scss';

const INITIAL_INPUT = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const SignUpPage = ({ userSignUpStartAsync, triggerErrorBanner, history }) => {
  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { email, username, password, confirmPassword } = inputState;

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return triggerErrorBanner('Passwords do not match.');
    }

    await userSignUpStartAsync(username, email, password);

    setInputState({ ...INITIAL_INPUT });

    history.push('/my-page');
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  return (
    <div className='sign-up-page'>
      <Banner>Welcome, Please Sign Up!</Banner>
      <form onSubmit={handleSubmit}>
        <div className='sign-in-input-container'>
          <InputBox
            label='Email'
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
          <InputBox
            label='Username'
            type='text'
            name='username'
            value={username}
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
          <InputBox
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <CustomButton type='submit' locatedIn='btn-in-sign-up-page'>
          Sign Up
        </CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  userSignUpStartAsync: (username, email, password) =>
    dispatch(userSignUpStartAsync(username, email, password)),
  triggerErrorBanner: errorMessage =>
    dispatch(triggerErrorBanner(errorMessage)),
});

export default connect(null, mapDispatchToProps)(SignUpPage);
