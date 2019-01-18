import React, { Component } from 'react';
import Layout from './Containers/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from '../src/Containers/Checkout/Checkout';
import {Route} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';
import Auth from '../src/Containers/auth/auth';
import Logout from '../src/Containers/auth/Logout/Logout';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={Auth}/>
        </Layout>
      </div>
    );
  }
}

export default App;
