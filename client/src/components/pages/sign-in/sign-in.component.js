import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Link from '../../link/link.component';
import Banner from '../../banner/banner.component';

import {
  userSignInSuccess,
  userSignInFailure,
} from '../../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async e => {
    const { email, password } = this.state;
    const { userSignInSuccess, userSignInFailure, history } = this.props;
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(userCredentials);

    try {
      const userObj = await axios
        .post('/api/user/sign-in', body, config)
        .then(res => res.data);
      console.log(userObj);

      userSignInSuccess(userObj);

      this.setState({
        email: '',
        password: '',
      });

      history.push('/my-page');
    } catch (err) {
      alert('Sign in has failed');
      console.error('ERROR UPON SIGN-IN:', err.message);
      userSignInFailure();
    }
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { email, password } = this.state;
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
  }
}

const mapDispatchToProps = dispatch => ({
  userSignInSuccess: userObj => dispatch(userSignInSuccess(userObj)),
  userSignInFailure: () => dispatch(userSignInFailure()),
});

export default connect(null, mapDispatchToProps)(SignInPage);
