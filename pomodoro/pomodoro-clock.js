// Default timer values in minutes
const BREAK_TIME = 5;
const SESSION_TIME = 25;
// Timer states
const NOT_STARTED = 0;
const STARTED = 1;
const PAUSED = 2;

class SessionComp extends React.Component {
  constructor (props) {
    super(props);
    this.decrSession = this.decrSession.bind(this);
    this.incrSession = this.incrSession.bind(this);
  }

  decrSession (e) {
    if (this.props.len > 1) {
      this.props.setSessionLength(this.props.len - 1);
      this.props.setCurrTimer(this.props.len - 1);
    }
  }

  incrSession (e) {
    if (this.props.len < 60) {
      this.props.setSessionLength(this.props.len + 1);
      this.props.setCurrTimer(this.props.len + 1);
    }
  }

  render () {
    return(<div>
        <label id="session-label" class="pomodoro-text">Session Length</label>
        <div className="length_buttons">
          <div id="session-decrement" onClick={this.decrSession}>
          <i className="fa fa-arrow-down fa-2x"/>
          </div>
          <div id="session-length" class="pomodoro-text">{this.props.len}</div>
          <div id="session-increment" onClick={this.incrSession}>
          <i className="fa fa-arrow-up fa-2x"/>
          </div>
        </div>
        </div>);
  }
} // end SessionComp class

class BreakComp extends React.Component {
  constructor (props) {
    super(props);

    this.decrBreak = this.decrBreak.bind(this);
    this.incrBreak = this.incrBreak.bind(this);
  }

  decrBreak (e) {
    if (this.props.len > 1) {
      this.props.setBreakLength(this.props.len - 1);
    }
  }

  incrBreak (e) {
    if (this.props.len < 60) {
      this.props.setBreakLength(this.props.len + 1);
    }
  }

  render () {
    return(<div>
        <label id="break-label" class="pomodoro-text">Break Length</label>
        <div className="length_buttons">
          <div id="break-decrement" onClick={this.decrBreak}>
            <i className="fa fa-arrow-down fa-2x"/></div>
          <div id="break-length" class="pomodoro-text">{this.props.len}</div>
          <div id="break-increment" onClick={this.incrBreak}>
          <i className="fa fa-arrow-up fa-2x"/></div>
        </div>
        </div>);
  }
} // end BreakComp class

class TimerComp extends React.Component {
  constructor (props) {
    super(props);
    this.displayTime = this.displayTime.bind(this);
  }

  displayTime () {
    let minutes = Math.floor(this.props.currTimer / 60);
    let seconds = this.props.currTimer % 60;
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ":" + seconds;
  }

  render () {
    const timer_label = this.props.isSession ? 'Session Time'
      : 'Break Time';
    return(<div id="timer" className="timer">
        <div id="timer-label" class="pomodoro-text">{timer_label}</div>
        <div id="time-left" class="pomodoro-text">{this.displayTime()}</div>
        <audio id="beep" preload="auto"
          src="https://goo.gl/65cBl1"/>
    </div>);
  }
} // end TimerComp class

class ControlsComp extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return(<div id="controls" className="controls">
      <div id="start_stop" onClick={this.props.setPlayPause}>
          <i className="fa fa-play fa-2x"/>
          <i className="fa fa-pause fa-2x"/>
        </div>
        <div id="reset" onClick={this.props.reset}>
          <i className="fa fa-refresh fa-2x"/>
        </div>
    </div>);
  }
} // end ControlsComp class

class Pomodoro extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      breakLen: BREAK_TIME,
      sessionLen: SESSION_TIME,
      sessionTimer: true,  // Session timer or break timer?
      currTimer: SESSION_TIME * 60,   // Number of seconds
      currState: NOT_STARTED,
      intervalID: ''  // ID from setInterval, needed for clearInterval
    };
    this.reset = this.reset.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.setPlayPause = this.setPlayPause.bind(this);
    this.decrTimer = this.decrTimer.bind(this);
    this.setCurrTimer = this.setCurrTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.playTimesUp = this.playTimesUp.bind(this);
    this.stopPlayingTimesUp = this.stopPlayingTimesUp.bind(this);
  }

  reset () {
    clearInterval(this.state.intervalID);
    this.stopPlayingTimesUp();
    this.setState({
      breakLen: BREAK_TIME,
      sessionLen: SESSION_TIME,
      sessionTimer: true,
      currState: NOT_STARTED,
      currTimer: SESSION_TIME * 60,
      intervalID: ''
    });
  }

  setBreakLength(len) {
    this.setState({
      breakLen: len
    });
  }

  setSessionLength(len) {
    this.setState({
      sessionLen: len
    });
  }

  setPlayPause () {
    if (this.state.currState === NOT_STARTED) {
      this.startTimer(true);
      return;
    }
    if (this.state.currState === PAUSED) {
      // Restart the timer
      let id = setInterval(this.decrTimer, 1000);
      this.setState({
        currState: STARTED,
        intervalID: id
      });
      return;
    } else {
      // Set to Paused
      this.setState({
        currState: PAUSED
      });
    }
  }

  startTimer (isSession) {
      let id = setInterval(this.decrTimer, 1000);
      this.setState({
        currState: STARTED,
        intervalID: id,
        currTimer: (isSession ? this.state.sessionLen
          : this.state.breakLen ) * 60,
        sessionTimer: isSession
      });
  }

  // decrTimer
  // decrement seconds
  // check pause flag
  // check if timer complete
  decrTimer () {
    console.log("decrTimer=" + this.state.currTimer);
    if (this.state.currTimer === 0 && this.state.currState != NOT_STARTED) {
      clearInterval(this.state.intervalID);
      this.playTimesUp();
      // Alternate between session and break timer.
      this.startTimer(!this.state.sessionTimer);
      return;
    }

    if (this.state.currState === PAUSED) {
      clearInterval(this.state.intervalID);
      return;
    }

    // Decrement timer by 1 second.
    this.setState({
      currTimer: this.state.currTimer - 1
    });
  }

  // setCurrTimer
  // val : minutes
  setCurrTimer(val) {
    this.setState({
      currTimer: val * 60
    });
  }

  playTimesUp () {
    const sound = document.getElementById('beep');
    sound.currentTime = 0;
    sound.play();
  }

  stopPlayingTimesUp () {
    const sound = document.getElementById('beep');
    sound.pause();
    sound.currentTime = 0;
  }

  render () {
    return(<div>
        <h1>Pomodoro Clock</h1>
        <div className="break_session">
          <BreakComp len={this.state.breakLen}
            setBreakLength={this.setBreakLength}/>
          <SessionComp len={this.state.sessionLen}
            setSessionLength={this.setSessionLength}
            setCurrTimer={this.setCurrTimer}/>
        </div>
        <TimerComp breakLen={this.state.breakLen}
          sessionLen={this.state.sessionLen}
          currTimer={this.state.currTimer}
          isSession={this.state.sessionTimer}
          />
        <audio id="beep" preload="auto"
          src="https://goo.gl/65cBl1"/>
        <ControlsComp reset={this.reset}
          setPlayPause={this.setPlayPause}/>
      </div>);
  }
} // end Pomodoro class

ReactDOM.render(<Pomodoro/>,
                document.getElementById('app'));
