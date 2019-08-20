import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import API from "../../utils/API";
import "./login.css";
import Axios from 'axios';

class LogIn extends Component {
  constructor() {
    super()
    
    this.state = {
      username: '',
      password: '',
      redirectTo: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('handleSubmit')

    Axios.post('user/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          })
          // update the state to redirect to user profile
          this.setState({
            redirectTo: '/profile/' + this.state.username
          })
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);
        
      })
  }
  
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <h3 className="loginTitle">Login</h3>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-3 col-mr-auto">
                <input className="form-input"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-3 col-mr-auto">
                <input className="form-input"
                  placeholder="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-7 col-mr-auto">
              <button
                className="btn col-3 col-mr-auto"
                onClick={this.handleSubmit}
                  type="submit">Login</button>
                </div>
            </div>
          </form>
        </div>
      )
    }
  }
}
export default LogIn;