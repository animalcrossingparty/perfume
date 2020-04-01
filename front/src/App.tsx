import React from 'react';
import './css/App.css';
import { Route } from 'react-router-dom';
import {HomePage,LoginPage,AboutPage} from './pages'

function App() {

  return (
    <div className="App">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/login" component={LoginPage} />

    </div>
  );
}

export default App;
