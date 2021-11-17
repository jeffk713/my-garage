import React from 'react';
import { connect } from 'react-redux';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Link from '../../link/link.component';
import Banner from '../../banner/banner.component';

import { userSignInStartAsync } from '../../../redux/user/user.actions';
import { getUserVehiclesStartAsync } from '../../../redux/vehicle/vehicle.actions';

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
    const { userSignInStartAsync, getUserVehiclesStartAsync, history } =
      this.props;
    e.preventDefault();
    const authUserObj = await userSignInStartAsync(email, password);

    if (!authUserObj) {
      return console.error('ERROR UPON SIGN-IN');
    }

    this.setState({
      email: '',
      password: '',
    });

    getUserVehiclesStartAsync(authUserObj.userId);
    
    history.push('/my-page');
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
  userSignInStartAsync: (email, password) =>
    dispatch(userSignInStartAsync(email, password)),
  getUserVehiclesStartAsync: userId =>
    dispatch(getUserVehiclesStartAsync(userId)),
});

export default connect(null, mapDispatchToProps)(SignInPage);
