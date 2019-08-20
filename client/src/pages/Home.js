import React from "react";
// import API from "../utils/API";
import "./Home.css";


class Home extends React.Component {
  state = {
    popularGames: [],
    users: [],
    guilds: []
  }

  // componentDidMount() {
  //   API.getPopular()
  //     .then(
  //       (response) => {
  //         // console.log(response)
  //         this.setState({ popularGames: response.data })
  //     }
  //   )

  //   API.getUser("users")
  //     .then(
  //       (response) => {
  //         console.log(response)
  //         console.log(response.data)
  //         this.setState({ users: response.data })
  //       }
  //   )

  //   API.getGuilds("guilds")
  //     .then(
  //       (response) => {
  //         console.log(response)
  //         this.setState({ users: response.data })
  //       }
  // )
  //  }

 
  render() {
    return (
      <main>
        <div className="container-fluid">
          <div className="row">
          <div className="col-sm-9">
          <center><h2 className="main-title">Popular Games</h2></center>
            <div className="row justify-content-center"> 
              {this.state.popularGames.map(game => (
                <div className="card main-card" id={game.id} key={game.id} style={{ width: "15rem" }}>
                <img src={game.images.original} className="card-img-top img-fluid img-thumbnail rounded pb-1" alt={game.name} />
                <div className="card-body d-flex flex-column p-0">
                  <h5 className="card-title main-card-title text-center font-weight-bold pb-2">{game.name}</h5>
                    <ul className="card-text">
                      <li># of players: {game.min_players} - {game.max_players}</li>
                      <li>Minimum Age: {game.min_age}</li>
                      <li>Playtime: {game.min_playtime} - {game.max_playtime} minutes</li>
                    </ul>
                  <a href="{game.url}" className="btn infoBtn btn-block mt-auto">More Info</a>
                  </div>
              {/* end of row */}
                </div>
              ))}
              {/* end of popular games column */}
              </div>
          </div>
          <div className="col-sm-3 sidebar">     
            <center><h3 className="sidebar-title">Adventurers</h3></center>
              <div className="card sidebar-card">
                <ul>
                  {this.state.users.map(user => (
                    <li id={user._id} key={user._id}>{user.username}</li>
                  ))}
                </ul>
              </div>
            <center><h3 className="sidebar-title">Guilds</h3></center>
              <div className="card sidebar-card">
                <ul>
                {this.state.guilds.map(guild => (
                  <li id={guild._id} key={guild._id}>{guild.name}</li>
                  ))}
                </ul>
              </div>
        {/* end of sidebar col */}
            </div>
        {/* end of row */}
          </div>
        {/* end of container */}
        </div>
      </main>
    )
  }

}

export default Home;