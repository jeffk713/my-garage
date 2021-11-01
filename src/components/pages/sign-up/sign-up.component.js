import React from 'react';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';

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

  handleSubmit = e => {
    const { email, username, password, confirmPassword } = this.state;

    e.preventDefault();

    console.log(this.state);
    if (password !== confirmPassword)
      return alert('paswords do not match, please enter the same password');

    this.setState({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
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
              type='text'
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

export default SignUpPage;
