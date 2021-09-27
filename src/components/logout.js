import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import "../styles/login.css";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  async handleLogout(){
    try{
      const response = await axiosInstance.post('/auth/logout/', {
        'refresh':localStorage.getItem("refresh_token")
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization'] = null;
      
      this.props.history.push("/");
      window.location.reload();
    } catch (e){
      console.log(e)
    }

  }
  render(){
      return(
          <div className={'logout'}>
            <div>
              <h3>Are You Sure?</h3>
            </div>
              <div>
                <button onClick={this.handleLogout}>Logout</button>
              </div>
          </div>
      )
  }
}

export default Logout;
