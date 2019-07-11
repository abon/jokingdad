import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import uuid from "uuid/v4";
import "./JokeList.css";
export default class JokeList extends Component {
  static defaultProps = {
    jokesNum: 10
  };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }
  async componentDidMount() {
    let jokes = [];
    while (jokes.length < this.props.jokesNum) {
      let res = await axios.get("https://icanhazdadjoke.com", {
        headers: { Accept: "application/json" }
      });
      jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
    }
    this.setState({ jokes: jokes });
    console.log(jokes);
  }
  handleVote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  }
  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title"> Joking Dad</h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt=""
          />
          <button className="JokeList-getmore">More Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map(j => (
            <div>
              <Joke
                key={j.id}
                votes={j.votes}
                text={j.text}
                downvote={() => this.handleVote(j.id, -1)}
                upvote={() => this.handleVote(j.id, 1)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
