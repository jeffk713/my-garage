import React from 'react';

import Navigator from './components/navigator/navigator.component';
import Homepage from './components/pages/homepage/homepage.component';
import MyPage from './components/pages/my-page/my-page.component';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Navigator />
        <div className='main'>
          {/* <Homepage /> */}
          <MyPage />
        </div>
      </div>
    );
  }
}

export default App;
