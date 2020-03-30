import React from 'react';
import './css/App.css';
import { Route } from 'react-router-dom';
import { Header } from './components';
import { Home, About } from './pages'

function App() {

  const user = {name:'Jack', age: 32}

  return (
    <div className="App">
      <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <div className="container center">
          {JSON.stringify(user)}
        </div>
        
    </div>
  );
}

export default App;
