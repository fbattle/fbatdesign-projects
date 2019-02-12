// Heater Kit
const bankOne = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

// Smooth Piano Kit
const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

class DrumPad extends React.Component {
  constructor (props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
      if (e.keyCode === this.props.keyCode) {
        this.playSound();
      }
  }

  playSound (e) {
    if (this.props.power) {
      const sound = document.getElementById(this.props.keyTrigger);
      sound.currentTime = 0;
      sound.play();
      this.props.display(this.props.id);
    }
  }

  render () {
    return (
      <div id={this.props.id} className="drum-pad"
        onClick={this.playSound}>
        <audio className='clip' id={this.props.keyTrigger}
          src={this.props.src}></audio>
          {this.props.keyTrigger}
      </div>
    );
  }
} // end DrumPad class

class PadButtons extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    // Can be different depending which Bank is active
    let padButtons = this.props.bank;
    padButtons = padButtons.map((pad, i) => { return(
      <DrumPad id={pad['id']} key={pad['id']} keyCode={pad['keyCode']}
        keyTrigger={pad['keyTrigger']} src={pad['url']}
        power={this.props.power} display={this.props.display}/>
      )}
    );

    return (
      <div className="pad-bank">
        {padButtons}
      </div>
    );
  }
} // end PadButtons class

class DrumMachine extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      power: true,
      volume: 0,
      bank: bankOne,
      display: ''
    };
    this.handlePowerClick = this.handlePowerClick.bind(this);
    this.handleBankClick = this.handleBankClick.bind(this);
    this.writeDisplay = this.writeDisplay.bind(this);
  }

  handlePowerClick() {
    // Here we toggle the power
    const display = this.state.power === true ? 'OFF' : '';
    this.setState({
      power: !this.state.power,
      display: display,
    });
  }

  handleBankClick() {
    if (this.state.power) {
      this.setState({
        bank: this.state.bank === bankOne ? bankTwo : bankOne
      });
    }
  }

  writeDisplay(str) {
    if (this.state.power) {
      this.setState({
        display: str
      });
    }
  }

  render () {
    return (<div>
        <div id="container" className="container">
          <div id="title_container" className="title_container">
            <h1 id="title_text" className="title_text">Drum Machine</h1>
          </div>
          <div id="pad_container" className="pad_container">

            <PadButtons bank={this.state.bank} power={this.state.power}
              display={this.writeDisplay}/>
          </div>
          <div id="controls_container" className="controls_container">
            <div className="controls">
              <label id="power_label">Power </label>
              <button id="power" onClick={this.handlePowerClick}>
                {this.state.power ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="controls">
              <Display display={this.state.display}/>
            </div>
            <div className="controls">
              <label id="bank_label">Bank </label>
              <button id="bank" onClick={this.handleBankClick}>
                {this.state.bank === bankOne ? '1' : '2'}
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
} // end DrumMachine class

const Display = (props) => {
  return (<p id="display" className="display">{props.display}</p>);
}

ReactDOM.render(<DrumMachine />,
                document.getElementById('drum-machine'));
