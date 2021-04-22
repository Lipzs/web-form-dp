import React from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';

import form from './pages/form';

const Routes = () => {
  return (
    <Router>
      <Route path="/" exact component={form}/>
    </Router>
  );
}

export default Routes;