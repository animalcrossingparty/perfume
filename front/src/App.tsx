import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage, AboutPage, LoginPage, TestPage, DetailPage } from './pages'



function App() {

  return (
    <div className="App">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/test" component={TestPage} />
      <Route path="/auth" component={LoginPage} />
      <Route path="/detail" component={DetailPage} />
    </div>
  );
}

export default App;
