import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as sematable } from 'sematable';

// Component
import Home from './View/Home/Home';
import Layout from './View/Layout/Layout';
import Advertisement from './View/Advertisement/Advertisement';
import CreateAdvertisement from './View/Advertisement/CreateAdvertisement';
import Social from './View/Social/Social';
import OurFees from './View/OurFees/OurFees';
import Transaction from './View/Transaction/Transaction';
import Dispute from './View/Dispute/Dispute';
import DisputeCreate from './View/Dispute/DisputeCreate';
import Wallet from './View/Wallet/Wallet';
import Profile from './View/Profile/Profile';
import NoMatch from './View/NoMatch';

import Auth from './Auth/Auth';
import history from './history';
import Callback from './Callback/Callback';

const reducer = combineReducers({ sematable })
const store = createStore(reducer, applyMiddleware(thunk));

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = (props) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout auth={auth} {...props}>
          {/* <Route path="/" render={(props) => <Home auth={auth} {...props} />} /> */}
          <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
          <Route path="/advertisement" exact component={Advertisement}></Route>
          <Route path="/advertisement/create" exact component={CreateAdvertisement}></Route>                                
          <Route path="/social" exact component={Social}></Route>
          <Route path="/ourfees" exact component={OurFees}></Route>  
          <Route path="/transaction" exact component={Transaction}></Route>  
          <Route path="/dispute" exact component={Dispute}></Route>                                                    
          <Route path="/dispute/create" exact component={DisputeCreate}></Route>
          <Route path="/wallet" exact component={Wallet}></Route> 
          <Route path="/profile" exact component={Profile}></Route>             
          <Route component={NoMatch} />        
          </Switch>                                          
        </Layout>
      </Router>
    </Provider>
  );
}
