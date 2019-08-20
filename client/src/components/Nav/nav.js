import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./nav.css";

class Nav extends Component {
  constructor() {
    super()
   
      this.logout = this.logout.bind(this)
     
  }

logout = event => {
  event.preventDefault()
    console.log("logging out")
  axios.post('/user/logout').then(response => {
    console.log(response.data)
    if (response.status === 200) {
      this.props.updateUser({
        loggedIn: false,
        username: ''
      })
    }
  }).catch(error => {
      console.log('Logout error')
    })
  }


  render() {
    const loggedIn = this.props.loggedIn;
        console.log('nav render, props: ')
        console.log(this.props);
    return (
      <nav className="navbar navbar-expand-lg flex-column">
      
        <a className="navbar-brand d-flex justify-content-center" href="/">
          <h1>Peoples with Meeples</h1>
        </a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar" aria-controls="collapsingNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-text">Where do you want to go?</span>
        </button>
        <div className="navbar-collapse collapse justify-content-center" id="collapsingNavbar">
          {loggedIn ? (
            <section className="navbar-section">
              <Link to="/" className="btn btn-link text-secondary" onClick={this.logout}>
                <span className="text-secondary">logout</span></Link>

            </section>
          ) : (
              <ul className="navbar-nav list-inline mr-auto mt-2 mt-lg-0">
                <li className="list-inline-item active"><a href="/" className="nav-link">Home<span className="sr-only">Home</span></a></li>
                <li className="list-inline-item"><a href="/signup" className="nav-link">Sign Up</a></li>
                <li className="list-inline-item"><a href="/login" className="nav-link">Log In</a></li>
                <li className="list-inline-item"><a href="/profile" className="nav-link">Profile</a></li>
                <li className="list-inline-item"><a href="/guild" className="nav-link">Guild</a></li>
                <li className="list-inline-item"><a href="/search" className="nav-link">Search</a></li>
              </ul>
            )}
        </div>
      </nav>
    );
  }
}
export default Nav;