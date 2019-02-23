import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path={'/'} component={HomePage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
