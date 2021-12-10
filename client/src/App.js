import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';

import Navigator from './components/navigator/navigator.component';
import Homepage from './components/pages/homepage/homepage.component';
import MyPage from './components/pages/my-page/my-page.component';
import AddUpdateVehiclePage from './components/pages/add-update-vehice/add-update-vehice.component';
import SignInPage from './components/pages/sign-in/sign-in.component';
import SignUpPage from './components/pages/sign-up/sign-up.component';
import ShopPage from './components/pages/shop/shop.component';
import VehicleDetailPage from './components/pages/vehicle-detail/vehicle-detail.component';
import AddVehicleServicePage from './components/pages/add-service-history/add-service-history.component';
import ErrorBanner from './components/error-banner/error-banner.component';

import { selectIsAuth } from './redux/user/user.selectors';

import './App.scss';

const App = ({ isAuth }) => {
  return (
    <div className='app'>
      <Navigator isAuth={isAuth} />
      <ErrorBanner />
      <div className='main'>
        <Switch>
          <Route
            exact
            path='/'
            render={({ ...props }) => <Homepage isAuth={isAuth} {...props} />}
          />
          <Route exact path='/sign-in' component={SignInPage} />
          <Route exact path='/sign-up' component={SignUpPage} />
          <Route exact path='/shop' component={isAuth ? ShopPage : Homepage} />
          <Route exact path='/my-page' component={isAuth ? MyPage : Homepage} />
          <Route
            exact
            path='/my-page/add-vehicle'
            component={isAuth ? AddUpdateVehiclePage : Homepage}
          />
          <Route
            path='/my-page/:vehicleId/edit'
            component={isAuth ? AddUpdateVehiclePage : Homepage}
          />
          <Route
            path='/my-page/:vehicleId/add-service'
            component={isAuth ? AddVehicleServicePage : Homepage}
          />
          <Route
            path='/my-page/:vehicleId/:serviceId'
            component={isAuth ? AddVehicleServicePage : Homepage}
          />
          <Route
            path='/my-page/:vehicleId'
            component={isAuth ? VehicleDetailPage : Homepage}
          />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
});

export default connect(mapStateToProps)(App);
