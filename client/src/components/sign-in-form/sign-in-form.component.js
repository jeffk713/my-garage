import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import InputBox from '../input-box/input-box.component';
import CustomButton from '../custom-button/custom-button.component';

import { userSignInStartAsync } from '../../redux/user/user.thunk-actions';

import './sign-in-form.styles.scss';

const INITIAL_INPUT = {
  email: '',
  password: '',
};

const SignInForm = ({ history, userSignInStartAsync }) => {
  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { email, password } = inputState;

  const handleSubmit = async e => {
    e.preventDefault();

    await userSignInStartAsync(email, password);

    setInputState({ ...INITIAL_INPUT });
    history.push('/my-page');
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };
  return (
    <form className='sign-in-form' onSubmit={handleSubmit}>
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
  );
};

const mapDispatchToProps = dispatch => ({
  userSignInStartAsync: (email, password) =>
    dispatch(userSignInStartAsync(email, password)),
});

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(SignInForm);
