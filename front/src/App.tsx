import React from 'react';
import './css/App.css';
import { Route } from 'react-router-dom';
import { HomePage, AboutPage, LoginPage, TestPage } from './pages'



function App() {

  return (
    <div className="App">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/test" component={TestPage} />
    </div>
  );
}

export default App;
