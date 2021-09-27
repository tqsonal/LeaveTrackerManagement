import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { BrowserRouter as Router ,NavLink,Switch,Route} from 'react-router-dom'
import LeaveApplication from './Components/LeaveApplication';
import AdminHandle from './Components/AdminHandle';
function App() {
  return (
    <div className="App">
      <Router>
       <h4 >  <NavLink exact to='/'> Home </NavLink>
        <NavLink to='/login'> LogIn </NavLink></h4>
<Switch>
  <Route path='/' exact component={Home}/>
  <Route path='/login' component={Login}/>
  <Route path='/signup' component={Signup}/>
  <Route path='/leaveapp/:id' component={LeaveApplication}/>
  <Route path='/admin' component={AdminHandle}/>  
  </Switch>


      </Router>
  
    </div>
  );
}

export default App;
