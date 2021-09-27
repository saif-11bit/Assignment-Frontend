import React, {Component} from "react";
import axiosInstance from '../axiosApi';
import '../App.css';


class Hello extends Component{
    constructor(props){
        super(props);
        this.state = {
            message:"",
        };
        this.getMessage = this.getMessage.bind(this);
    }
    async getMessage(){
        try{
            let response = await axiosInstance.get('auth/hello/');
            const message = response.data.hello
            this.setState({
                message:message
            })
            return message;
        }catch(error){
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }
    componentDidMount(){
        this.getMessage();
    }
    
    render(){
        return(
            <div className={'hello'}>
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}

export default Hello;