import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
// import { getByDisplayValue } from "@testing-library/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

var styles = {
  topContainer: {
    display: "flex",
    flexFlow: "row wrap-reverse",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    justifySelf: "center",
    padding: "0",
    margin: "0",
  },
  button: {
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "7px",
    background: "rgb(255, 152, 194)",
    fontFamily: '"Open Sans", sans-serif',
    padding: "0.25em 0.75em",
    minWidth: "7ch",
    minHeight: "44px",
    margin: "10px",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.18)",
    fontSize: "17px",
    textAlign: "center",
    lineHeight: "1.1",
    position: "relative",
  },
  pageTitle: {
    fontFamily: '"Work Sans", sans-serif',
    color: "#ff87c5",
    fontSize: "47px",
  },
  h2: {
    fontSize: "22px",
    textTransform: "lowercase",
    color: "#585858",
    fontFamily: '"Open Sans", sans-serif',
  },
  labelContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
  },
  breakLabel: {
    padding: "10px",
    display: "flex",
    flexDirection: "row",
  },
  sessionLabel: {
    padding: "10px",
    display: "flex",
    alignSelf: "flex-start",
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      break_length: 1,
      session_length: 1,
      minutes: 1,
      seconds: 0,
      cycle: "session",
      countdown: false,
    };
  }
  audio = new Audio(
    "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
  );

  playAudio = () => {
    this.audio.play();
    setTimeout(() => this.audio.pause(), 500);
  };

  break_decrement = () => {
    if (this.state.break_length > 0) {
      this.setState({
        break_length: this.state.break_length - 1,
      });
    }
  };

  break_increment = () => {
    if (this.state.break_length < 60) {
      this.setState({
        break_length: this.state.break_length + 1,
      });
    }
  };

  session_decrement = () => {
    if (this.state.session_length > 0)
      this.setState({
        session_length: this.state.session_length - 1,
        minutes: this.state.session_length - 1,
      });
  };

  session_increment = () => {
    if (this.state.session_length < 60) {
      this.setState({
        session_length: this.state.session_length + 1,
        minutes: this.state.session_length + 1,
      });
    }
  };

  next_cycle = () => {
    const previousCycleWasSession = this.state.cycle === "session";
    if (previousCycleWasSession) {
      this.setState({
        cycle: "break",
        minutes: this.state.break_length,
      });
      this.playAudio();
    } else {
      this.setState({
        cycle: "session",
        minutes: this.state.session_length,
      });
    }
  };

  start_timer = (onTimerFinish) => {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          onTimerFinish();
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 100);
  };

  stop_timer = () => {
    clearInterval(this.myInterval);
  };

  start_stop = () => {
    const shouldPlay = !this.state.countdown;

    if (shouldPlay) {
      this.start_timer(this.next_cycle);
    } else {
      this.stop_timer();
    }

    this.setState({ countdown: shouldPlay });
  };

  reset = () => {
    this.setState({
      break_length: 5,
      session_length: 25,
      minutes: 25,
      seconds: 0,
      cycle: "session",
      countdown: false,
    });
  };

  render() {
    const { minutes, seconds, cycle } = this.state;
    return (
      <div>
        <div>
          <h1 style={styles.pageTitle} id="page-title">
            Pomodoro Timer
          </h1>
          <div id="timer-label">
            <h2 style={styles.h2} id="mainLabel">
              {cycle === "break" ? "Break Time" : "Session in progress"}
            </h2>
          </div>
          <div style={styles.topContainer} className="topContainer">
            <div id="time-left">
              <h4 class="timer">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}{" "}
              </h4>
            </div>
          </div>
          <div className="midContainer">
            <button
              style={styles.button}
              id="start_stop"
              class="start"
              onClick={this.start_stop}
            >
              {" "}
              {this.state.countdown ? "Stop" : "Start"}
            </button>
            <button
              style={styles.button}
              class="reset"
              id="reset"
              onClick={this.onClick}
            >
              Reset{" "}
            </button>
            <audio
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
              id="beep"
              ref={this.audio}
              preload="auto"
            />
          </div>

          <div className="container">
            <button
              style={styles.button}
              id="break-decrement"
              onClick={this.break_decrement}
            >
              <FontAwesomeIcon icon={faSortDown} id="iconBdown" />
            </button>
            <button
              style={styles.button}
              id="break-increment"
              onClick={this.break_increment}
            >
              <FontAwesomeIcon icon={faSortUp} id="iconBup" />
            </button>

            <button
              style={styles.button}
              id="session-decrement"
              onClick={this.session_decrement}
            >
              <FontAwesomeIcon icon={faSortDown} id="iconSdown" />
            </button>
            <button
              style={styles.button}
              id="session-increment"
              onClick={this.session_increment}
            >
              <FontAwesomeIcon icon={faSortUp} id="iconSup" />
            </button>
          </div>
          <div style={styles.labelContainer} className="labelContainer">
            <div id="break-length" className="break-label">
              <div style={styles.breakLabel} id="break-label">
                {" "}
                Break Length: {this.state.break_length} mins
              </div>
            </div>
            <div id="session-length" className="session-label">
              <div style={styles.sessionLabel} id="session-label">
                Session Length: {this.state.session_length} mins
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
export default App;
