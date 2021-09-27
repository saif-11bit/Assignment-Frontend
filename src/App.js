import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Hello from "./components/hello";
import './App.css';
import ChangePassword from "./components/changePassword";
import ResetPassword from "./components/resetPassword";
import Logout from "./components/logout";


class App extends Component{
  constructor(){
    super();
    this.state = {
      loggedIn:null,
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }


  //LOGGED IN?
  isLoggedIn(){
    const logged = localStorage.getItem('access_token')
    if (logged != null){
      this.setState({
        loggedIn:true
      })
    }
  }
  componentDidMount(){
    this.isLoggedIn();
  }

  render(){
    return(
      <div className="site">
          <nav>
            <div className={'logo'}>
              My Site
            </div>
            {this.state.loggedIn?(
              <div>
                <Link className={"nav-link"} to={"/"}>Home</Link>
                <Link className={"nav-link"} to={"/hello/"}>Hello</Link>
                <Link className={"nav-link"} to={"/change-password/"}>Change Password</Link>
                <Link className={"nav-link"} to={"/logout/"}>Logout</Link>
              </div>
              
            ):(
              <div>
                <Link className={"nav-link"} to={"/"}>Home</Link>
                <Link className={"nav-link"} to={"/login/"}>Login</Link>
                <Link className={"nav-link"} to={"/register/"}>Register</Link>
              </div>
            )}
          </nav>
          <main>
            <Switch>
            {this.state.loggedIn?(
              <>
              
              <Route exact path={"/hello/"} component={Hello} />
              <Route exact path={"/logout/"} component={Logout} />
              <Route exact path={"/change-password/"} component={ChangePassword} />
              <Route exact path={"/"} render={() => <div className={'home'}><h2>Welcome Home!</h2></div>} />
              </>
            ):(
              <>
              <Route exact path={"/login/"} component={Login} />
              <Route exact path={"/register/"} component={Register} />
              <Route exact path={"/reset-password/"} component={ResetPassword} />
              <Route exact path={"/"} render={() => <div className={'home'}><h2>Welcome Home!</h2></div>} />
              </>
            )}

              
            </Switch>
          </main>
        </div>
      
    )
  }
}

export default App;