import React from "react";
import axios from "axios";
import { getCurrentGameWeek } from "../utils/nfl";
import LeaderboardTable from "../components/LeaderboardTable";
import WeeklyTable from "../components/WeeklyTable";
import GameWeekOptions from '../components/GameWeekOptions';
import "../styles/Leaderboard.css";
import ReactGA from "react-ga";

function formLoader() {
  const x = document.getElementById("weekform");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "block";
  }
}

function formCloser() {
  const x = document.getElementById("weekform");
  x.style.display = "none";
}

function activeSetter() {
  if (document.getElementById("season")) {
    const activeButton = document.getElementById("season");
    activeButton.style = "border-bottom: 1px solid; padding-bottom: 1px";
    document.getElementById("weekly").style = "color: black; border: none;";
  }
}

function activeSetter2() {
  if (document.getElementById("weekly")) {
    const activeButton = document.getElementById("weekly");
    activeButton.style = "border-bottom: 1px solid; padding-bottom: 1px";
    document.getElementById("season").style = "color: black; border: none;";
  }
}
// background-color: var(--red);
//     color: white;

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: "",
      users: [],
      weekly: false,
      weeklytext: "NFL Season",
      query: ""
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.setState({ week: getCurrentGameWeek() });
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/leaderboard/global`)
      .then(response => {
        this.setState({ users: response.data.users });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSwitch(weekly, weeklytext) {
    this.setState({ weekly, weeklytext });
  }

  handleSearch(event) {
    this.setState({ query: [...event.currentTarget.value].join("") });
  }

  render() {
    const { weekly, weeklytext } = this.state;
    return (
      <div className="page">
        <div className="top">
          <div className="leftside">
            <div className="titleAndWeek">
              <h2 className="leaderboardtext">{`${weeklytext}`}</h2>
              <div id="weekform">
                <select onChange={e => this.setState({ week: e.target.value })}>
                  <GameWeekOptions totalWeeks="17" />
                </select>
              </div>
            </div>

            <div className="filterbuttons">
              <button
                class="btn active"
                id="season"
                onClick={() => {
                  this.handleSwitch(false, "NFL Season");
                  formCloser();
                  activeSetter();
                }}
              >
                Season
              </button>
              <button
                id="weekly"
                onClick={() => {
                  this.handleSwitch(true, "NFL Week");
                  formLoader();
                  activeSetter2();
                }}
              >
                Weekly
              </button>
            </div>
          </div>

          <div className="Searchform">
            <span
              className="LeaderboardSearchIcon"
              role="img"
              aria-label="glass"
            >
              🔍
            </span>
            <input
              type="search"
              placeholder="Search players"
              value={this.state.query}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="boards">
          {weekly === true ? (
            <WeeklyTable query={this.state.query} week={this.state.week} />
          ) : (
            <LeaderboardTable
              users={this.state.users}
              query={this.state.query}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
