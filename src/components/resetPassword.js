import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import "../styles/login.css";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { newPassword: "", newPassword2: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleReset(e){
      const queryParams = new URLSearchParams(window.location.href);
      // console.log(queryParams)
      const uidb64 = queryParams.get('uidb64');
      const token = queryParams.get('token');
      if (this.state.newPassword === this.state.newPassword2){
        axiosInstance.patch('auth/complete-password-reset/', {
          password:this.state.newPassword,
          token:token,
          uidb64:uidb64,
        }).then(res => {
          console.log(res)
        })
      }
      this.props.history.push("/login/");
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render(){
      return(
        <div className={'main-content'}>
        <div>
          <form onSubmit={this.handleReset}>
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

            <input className={'submit'} type="submit" value="Reset Password" />
          </form>
        </div>
      </div>
      )
  }
}

export default ResetPassword;
