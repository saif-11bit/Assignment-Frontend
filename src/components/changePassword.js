import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import "../styles/login.css";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { newPassword: "", newPassword2: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }


  handlePasswordChange(e){

    const token = localStorage.getItem('access_token');
    if (this.state.newPassword === this.state.newPassword2){
      axiosInstance.patch('auth/change-password/', {
        password:this.state.newPassword,
        token:token,
      }).then(res => {
        console.log(res)
      })
    }
    this.props.history.push("/");
    alert('Password updated!!!');
}

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render(){
      return(
        <div className={'main-content'}>
        <div>
          <form onSubmit={this.handlePasswordChange}>
            <input
              name="newPassword"
              placeholder="New Password"
              type="password"
              value={this.state.newPassword}
              onChange={this.handleChange}
            />
            <input
              name="newPassword2"
              type="password"
              placeholder="Confirm Password"
              value={this.state.newPassword2}
              onChange={this.handleChange}
            />
            <input className={'submit'} type="submit" value="Change Password" />
          </form>
        </div>
      </div>
      )
  }
}

export default ChangePassword;
