import React, { Component } from "react";
import axiosInstance from "../axiosApi";
import "../styles/login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleReset(e){
    try{
      axiosInstance.post("auth/request-password-reset/", {
        email: this.state.email,
        redirect_url: 'http://localhost:3000/reset-password/',
      }).then(
        alert('Reset link sent to ur email')
      )
    } catch(error){
      throw error;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await axiosInstance.post("/auth/login/", {
        email: this.state.email,
        password: this.state.password,
      });
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + data.data.token.access;
      console.log(data);
      localStorage.setItem("access_token", data.data.token.access);
      localStorage.setItem("refresh_token", data.data.token.refresh);
      this.props.history.push("/");
      window.location.reload();
      // return data.data
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div className={'main-content'}>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className={'forgot-password'}>
                Forgot Password?
                <button onClick={this.handleReset}>Reset</button>
            </div>
            <input className={'submit'} type="submit" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
