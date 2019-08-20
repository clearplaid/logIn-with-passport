import React from "react";
import "./Profile.css";
// import API from "../utils/API";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
    }
    console.log(this.state.user);
  }
   

  render() {
    return (
      <main>
        <h2 className="profileTitle"><strong>Profile</strong></h2>
      
      </main>
    )
  }

}

export default Profile;