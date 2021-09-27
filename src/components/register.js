import React, {Component} from "react";
import axiosInstance from "../axiosApi";
import "../styles/login.css";


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
          email: "",
          password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    handleChange(e) {
      this.setState({[e.target.name]:e.target.value});
    }
    
    async handleSubmit(e){
      e.preventDefault();
      try{
          const data = await axiosInstance.post('/auth/register/', {
              email: this.state.email,
              password: this.state.password,
          });
          console.log(data)
          this.props.history.push("/login/");
          alert('Verification Link Sent To your email!');
      } catch (error){
          throw error;
      }
  }

    render(){
        return(
          <div className={'main-content'}>
          <div>
                <form onSubmit={this.handleSubmit}>
                  <input name="email" type="email" placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
                  <input name="password" type="password" placeholder='Password' value={this.state.password} onChange={this.handleChange}/>

                  <input className={'submit'} type="submit" value="Register"/>
                </form>
                </div>
      </div>
        )
    }
}

export default Register;