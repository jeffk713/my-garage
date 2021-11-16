import React from 'react';
import { connect } from 'react-redux';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';

import { userSignUpStartAsync } from '../../../redux/user/user.actions';

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
    const { userSignUpStartAsync, history } = this.props;

    e.preventDefault();
    if (password !== confirmPassword)
      return alert('paswords do not match, please enter the same password');

    const signUpSuccess = await userSignUpStartAsync(username, email, password);

    if (!signUpSuccess) {
      return console.error('ERROR UPON SIGN-UP');
    }

    this.setState({
      email: '',
      password: '',
    });

    history.push('/my-page');
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
  }
}

const mapDispatchToProps = dispatch => ({
  userSignUpStartAsync: (username, email, password) =>
    dispatch(userSignUpStartAsync(username, email, password)),
});

export default connect(null, mapDispatchToProps)(SignUpPage);
