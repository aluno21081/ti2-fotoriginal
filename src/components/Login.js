import React from 'react';
import axios from 'axios';
import {createBrowserHistory} from 'history';
import {
    Link
} from "react-router-dom";

export default class Register extends React.Component {
   
    constructor(props) {
        super(props);
    
        this.state = {
            identifier: "",
            password: "",
        };
      }
   
    /* state = {
        identifier: "",
        password: "",
    } */


    actIdentifier = (event) => {
        event.preventDefault();
        this.setState({
            identifier: event.target.value,
        });
    }

    actPassword = (event) => {
        event.preventDefault();
        this.setState({
            password: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const dados = {
            identifier: this.state.identifier,
            password: this.state.password,
        };
        axios
            .post('http://localhost:1337/auth/local', dados)
            .then(response => {
                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                localStorage.setItem('user', JSON.stringify(response.data));
                document.getElementById("formLogin").reset();
                window.location.href = 'http://localhost:3000/upload';
                
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }

    render() {
        return (
            <div className="login-wrapper">

                <h3>Log in</h3>

                <form id="formLogin" onSubmit={this.handleSubmit}>
                <div className="form-group mt-4">
                    <label>Email address</label>
                    <input type="email" className="form-control" onChange={this.actIdentifier}  placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={this.actPassword} placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right mt-3">
                    No account? <Link to="/register">Sign Up!</Link>
                </p>
                </form>
            </div>
        );
    }
}