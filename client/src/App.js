import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigator from './components/navigator/navigator.component';
import Homepage from './components/pages/homepage/homepage.component';
import MyPage from './components/pages/my-page/my-page.component';
import AddVehiclePage from './components/pages/add-vehicle/add-vehicle-page.component';
import SignInPage from './components/pages/sign-in/sign-in.component';
import SignUpPage from './components/pages/sign-up/sign-up.component';
import VehicleDetailPage from './components/pages/vehicle-detail/vehicle-detail.component';
import AddVehicleServicePage from './components/pages/add-service-history/add-service-history.component';

import './App.scss';

const App = () => {
  return (
    <div className='app'>
      <Navigator />
      <div className='main'>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/sign-in' component={SignInPage} />
          <Route exact path='/sign-up' component={SignUpPage} />
          <Route exact path='/my-page' component={MyPage} />
          <Route exact path='/my-page/add-vehicle' component={AddVehiclePage} />
          <Route
            path='/my-page/:vehicleId/add-service'
            component={AddVehicleServicePage}
          />
          <Route path='/my-page/:vehicleId' component={VehicleDetailPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
