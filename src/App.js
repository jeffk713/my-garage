import React from 'react';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <div className='navigator'>
          <div className='logo'>
            <h1>LOGO</h1>
          </div>
          <div className='link-container'>
            <div className='link'>
              <a href='/'>my page</a>
            </div>
            <div className='link'>
              <a href='/'>shops</a>
            </div>
            <div className='link'>
              <a href='/'>sign in/up</a>
            </div>
          </div>
        </div>
        <div className='main'>
          <div className='homepage-banner'>
            <h1 className='banner-title'>Manage your vehicles at your click</h1>
            <button className='btn'>sign in or up</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
