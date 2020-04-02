import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage, AboutPage, LoginPage } from './pages'



function App() {

  return (
    <div className="App">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route path="/auth" component={LoginPage} />
    </div>
  );
}

export default App;
