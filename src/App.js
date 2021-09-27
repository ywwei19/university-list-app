import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import SubscribedData from './pages/SubscribedData';
import FavoritesPage from './pages/Favorites';
import Layout from './components/layout/Layout';
import GenericNotFound from './components/notFound/GenericNotFound';

// <Switch> is to make sure only one route is return; else nested/ 2 route appear
// exact is to make sure fully match route just return; else /meetup will get /; since found one result not fully match
function App() {
  return (
    <Layout>
      <Switch> 
        <Route path='/' exact>
          <Main />
        </Route>
        <Route path='/subscribe' exact>
          <SubscribedData />
        </Route>
        <Route path='/favorites'>
          <FavoritesPage />
        </Route>
        <Route component={GenericNotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
