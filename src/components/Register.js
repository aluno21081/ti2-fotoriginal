import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {
   
    constructor(props) {
        super(props);
    
        this.state = {
            username: "",
            email: "",
            password: "",
        };
      }
   
   
   /*  state = {
        username: "",
        email: "",
        password: "",
    } */

    actUsername = (event) => {
        event.preventDefault();
        this.setState({
            username: event.target.value,
        });
    }

    actEmail = (event) => {
        event.preventDefault();
        this.setState({
            email: event.target.value,
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
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

        axios.post(`http://localhost:1337/auth/local/register`, dados)
            .then(response => {
                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                localStorage.setItem('user', JSON.stringify(response.data));
                document.getElementById("formRegisto").reset();
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    }

    render() {
        return (

            <div className="login-wrapper">

                <h3>Registo</h3>
                <form id="formRegisto" onSubmit={this.handleSubmit}>

                    <div className="form-group mt-4">
                        <label>Username</label>
                        <input type="text" className="form-control" onChange={this.actUsername} placeholder="Enter username" />
                    </div>

                    <div className="form-group mt-4">
                        <label>Email address</label>
                        <input type="email" className="form-control" onChange={this.actEmail} placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={this.actPassword} placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        );
    }
}