import React from 'react';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Link from '../../link/link.component';

import './sign-in.styles.scss';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    console.log(this.state);

    this.setState({
      email: '',
      password: '',
    });
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
        <h2> Welcome back, please sign in!</h2>
        <form onSubmit={handleSubmit}>
          <div className='sign-in-input-container'>
            <InputBox
              label='email'
              type='text'
              name='email'
              value={email}
              onChange={handleChange}
              required
            />
            <InputBox
              label='password'
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <CustomButton type='submit' locatedIn='in-sign-in-page'>
            Sign In
          </CustomButton>
        </form>
        <Link
          linkStyle='inline-link'
          linkName='you are not registered yet? sign up here!'
          urlToGo='/sign-up'
        />
      </div>
    );
  }
}

export default SignInPage;
