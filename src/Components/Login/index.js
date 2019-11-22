import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    handleChange = (e) =>{ 
        this.setState({
            [e.target.name]: e.currentTarget.value
        });
        console.log(this.state);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Handling Submit to Login')
        const loginIn = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': "application/json"
            }
        })
        console.log(loginIn, "<--------Login")
        const parsedLogin = await loginIn.json()
        console.log(parsedLogin, "<-------parsedLogin")
        if(parsedLogin.status.message === "Success"){
            console.log("Login success")
            this.props.doUpdateCurrentUser(parsedLogin.data)
            this.props.history.push('/games')
        }    
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <p>Username:</p>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                    <p>Password:</p>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    <button type="submit">Login</button>
                </form>
            </>
        )
    }
}

export default withRouter(Login);