import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navigator from './components/navigator/navigator.component';
import Homepage from './components/pages/homepage/homepage.component';
import MyPage from './components/pages/my-page/my-page.component';
import AddVehiclePage from './components/pages/add-vehicle/add-vehicle-page.component';
import SignInPage from './components/pages/sign-in/sign-in.component';
import SignUpPage from './components/pages/sign-up/sign-up.component';
import VehicleDetailPage from './components/pages/vehicle-detail/vehicle-detail.component';
import AddVehicleServicePage from './components/pages/add-service-history/add-service-history.component';
import ErrorBanner from './components/error-banner/error-banner.component';

import { selectIsAuth } from './redux/user/user.selectors';

import './App.scss';

const App = ({ isAuth }) => {
  return (
    <div className='app'>
      <Navigator />
      <ErrorBanner />
      <div className='main'>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/sign-in' component={SignInPage} />
          <Route exact path='/sign-up' component={SignUpPage} />
          <Route
            exact
            path='/my-page'
            render={() => (isAuth ? <MyPage /> : <Redirect to='/' />)}
          />
          <Route
            exact
            path='/my-page/add-vehicle'
            render={({ ...props }) =>
              isAuth ? <AddVehiclePage {...props} /> : <Redirect to='/' />
            }
          />
          <Route
            path='/my-page/:vehicleId/edit'
            render={({ ...props }) =>
              isAuth ? <AddVehiclePage {...props} /> : <Redirect to='/' />
            }
          />
          <Route
            path='/my-page/:vehicleId/add-service'
            render={({ ...props }) =>
              isAuth ? (
                <AddVehicleServicePage {...props} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/my-page/:vehicleId/:serviceId'
            render={({ ...props }) =>
              isAuth ? (
                <AddVehicleServicePage {...props} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/my-page/:vehicleId'
            render={({ ...props }) =>
              isAuth ? <VehicleDetailPage {...props} /> : <Redirect to='/' />
            }
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
