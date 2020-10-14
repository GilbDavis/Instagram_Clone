import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Provider>
    </Router >
  );
}

export default App;
