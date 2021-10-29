import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigator from './components/navigator/navigator.component';
import Homepage from './components/pages/homepage/homepage.component';
import MyPage from './components/pages/my-page/my-page.component';
import AddVehiclePage from './components/pages/add-vehicle/add-vehicle-page.component';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Navigator />
        <div className='main'>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/my-page' component={MyPage} />
            <Route
              exact
              path='/my-page/add-vehicle'
              component={AddVehiclePage}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
