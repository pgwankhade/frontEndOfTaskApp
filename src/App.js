import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Nav from "./components/Nav";
import Dailytask from "./components/Dailytask"
import Register from './components/Register';
import LogIn from './components/LogIn'

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      route: 'signin'
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }  

  render() {
    return (
    <Router>
  { this.state.route === 'home'?
     <div>
          <Nav onRouteChange={this.onRouteChange}/>
          <Dailytask />
           {/* <Dailytask/> */}
      </div>  
      :(
        <div>
           <Route path='/' exact component={()=><LogIn onRouteChange={this.onRouteChange} />} />
           <Route path='/register' component={()=><Register onRouteChange={this.onRouteChange}/>} />
        </div>
      )
  }
      </Router>
      
    );
  }
}

export default App;
