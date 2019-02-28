import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import logo from './logo.svg';

// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Layout>
        <BurgerBuilder />
       </Layout>
      </div>
    );
  }
}

export default App;
