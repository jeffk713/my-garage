import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';

import {
  userSignUpSuccess,
  userSignUpFailure,
} from '../../../redux/user/user.actions';

import './sign-up.styles.scss';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }
  handleSubmit = async e => {
    const { email, username, password, confirmPassword } = this.state;
    const { userSignUpSuccess, userSignUpFailure, history } = this.props;

    e.preventDefault();

    console.log(this.state);
    if (password !== confirmPassword)
      return alert('paswords do not match, please enter the same password');

    const newUser = {
      email,
      username,
      password,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(newUser);

    try {
      const userObj = await axios
        .post('/api/user/sign-up', body, config)
        .then(res => res.data);
      console.log('user', userObj);

      userSignUpSuccess(userObj);

      this.setState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });

      history.push('/my-page');
    } catch (err) {
      alert('Sign up has failed');
      console.error('ERROR UPON SIGN-UP:', err.message);
      userSignUpFailure();
    }
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { email, username, password, confirmPassword } = this.state;
    return (
      <div className='sign-up-page'>
        <Banner>Welcome, please sign up!</Banner>
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
  }
}

const mapDispatchToProps = dispatch => ({
  userSignUpSuccess: userObj => dispatch(userSignUpSuccess(userObj)),
  userSignUpFailure: () => dispatch(userSignUpFailure()),
});

export default connect(null, mapDispatchToProps)(SignUpPage);
