class CalcButton extends React.Component {
  constructor (props) {
    super(props);
    this.processButton = this.processButton.bind(this);
  }

  processButton() {
    switch (this.props.button) {
      case 'AC':
        this.props.func();
        break;
      case '=':
        // TODO calculate result
        this.props.func();
        break;
      case '*':
      case '/':
      case '+':
      case '-':
        // TODO handle operators
        this.props.func(this.props.button);
        break;
      default:
        this.props.func(this.props.button);
        break;
    }
  }

  render () {
    return (
      <div id={this.props.id} className={this.props.className}
        onClick={this.processButton} style={this.props.style}>
      {this.props.button}</div>
    );
  }
} // end CalcButton class

class Display extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div id="display" className="display row1">
      {this.props.displayVal}</div>
    );
  }
} // end Display class

class Calculator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      display: '0',
      prevValue: '0',
      formula: '',
      clear: false,
      lastButton: ''
    }
    this.writeDisplay = this.writeDisplay.bind(this);
    this.resetDisplay = this.resetDisplay.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  resetDisplay(e) {
    console.log("resetDisplay");
    this.setState({
      display: '0',
      prevValue: '0',
      formula: '',
      clear: false,    // clear: true when we want a new number to display,
                       // which always happens after an operator is entered.
      lastButton: ''   // op for operator, else blank
    });
  }

  writeDisplay(str) {
    console.log("enter writeDisplay=" + str);
    console.log("state.display=" + this.state.display);
    // Set not dealing with an operator
    this.setState({
      lastButton: ''
    });
    // Only one decimal allowed per number
    if (str === '.') {
      if ([...this.state.display].indexOf('.') != -1) {
        return;
      }
      if (this.state.display == '0' || this.state.clear === true) {
        this.setState( {
          clear: false,
          display: '0' + str
        });
        return;
      }
    }

    if (this.state.display === '0') {
      if (str == '0') {
        // Display only one zero
        return;
      } else {
        // If currently zero, then replace it
        this.setState( {
          clear: false,
          display: str
        });
        return;
      }
    }

    if (this.state.clear === true) {
      this.setState( {
        clear: false,
        display: str
      });
    } else {
      this.setState((state) => ( {
        clear: false,
        display: state.display + str
      }));
    }
  }

  handleOperator(str) {
    let formula = this.state.formula;
    const regex = /[+\-\/*]$/;
    if (regex.test(formula) && this.state.lastButton === 'op') {
      // If another operator is entered,
      // then replace previous with current operator.
      formula = [...formula].slice(0, formula.length - 1);
      console.log('edited formula=' + formula + str);
      this.setState( {
        formula: formula + str,
        clear: true,
        lastButton: 'op'
      });
    } else {
      console.log('new formula=' + formula + this.state.display + str);
      this.setState((state) => ( {
        formula: formula + state.display + str,
        clear: true,
        lastButton: 'op'
      }));
    }
  }

  handleEquals() {
    console.log("equals: formula=" + this.state.formula);
    console.log("equals: display=" + this.state.display);
    const answer = eval(this.state.formula + this.state.display);
    console.log("answer=" + answer);
    this.setState({
      clear: true,
      display: answer,
      prevValue: answer,
      formula: '',
      lastButton: ''
    });
  }

  render () {
    const equalStyle = { gridRow: '5 / 7', gridColumn: 4 };
    return (
      <div><h1>Calculator</h1>
        <div className="calc">
          <Display id="display" displayVal={this.state.display}/>
          <CalcButton id="clear" className="calcButton twoCol row2" button="AC" func={this.resetDisplay}></CalcButton>
          <CalcButton id="divide" className="calcButton oneCol row2"
            button="/" func={this.handleOperator}></CalcButton>
          <CalcButton id="multiply" className="calcButton oneCol row2"
            button="*" func={this.handleOperator}></CalcButton>
          <CalcButton id="seven" className="calcButton oneCol row3"
            button="7" func={this.writeDisplay}></CalcButton>
          <CalcButton id="eight" className="calcButton oneCol row3"
            button="8" func={this.writeDisplay}></CalcButton>
          <CalcButton id="nine" className="calcButton oneCol row3"
            button="9" func={this.writeDisplay}></CalcButton>
          <CalcButton id="subtract" className="calcButton oneCol row3"
            button="-" func={this.handleOperator}></CalcButton>
          <CalcButton id="four" className="calcButton oneCol row4"
            button="4" func={this.writeDisplay}></CalcButton>
          <CalcButton id="five" className="calcButton oneCol row4"
            button="5" func={this.writeDisplay}></CalcButton>
          <CalcButton id="six" className="calcButton oneCol row4"
            button="6" func={this.writeDisplay}></CalcButton>
          <CalcButton id="add" className="calcButton oneCol row4"
            button="+" func={this.handleOperator}></CalcButton>
          <CalcButton id="one" className="calcButton oneCol row5"
            button="1" func={this.writeDisplay}></CalcButton>
          <CalcButton id="two" className="calcButton oneCol row5"
            button="2" func={this.writeDisplay}></CalcButton>
          <CalcButton id="three" className="calcButton oneCol row5"
            button="3" func={this.writeDisplay}></CalcButton>
          <CalcButton id="zero" className="calcButton twoCol row6"
            button="0" func={this.writeDisplay}></CalcButton>
          <CalcButton id="decimal" className="calcButton oneCol row6"
            button="." func={this.writeDisplay}></CalcButton>
          <CalcButton id="equals" className="calcButton " style={equalStyle}
            button="=" func={this.handleEquals}></CalcButton>
        </div>
      </div>
    );
  }
} // end Calculator class

ReactDOM.render(<Calculator/>,
                document.getElementById('app'));
