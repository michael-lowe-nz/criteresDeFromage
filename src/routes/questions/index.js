import { h, Component } from 'preact';
import style from './style.scss';

export default class Questions extends Component {
  state = { mike: 'helsinki' }

  handleAnswer = (question, answer) => {
    this.setState({
      [question]: answer,
      rating: 50
    })
  }

  render() {
    return (
      <section class="section main">
        <div class="container">
          <div class="columns is-multiline">
            <Question
              onClick={this.handleAnswer}
              question={"What cheese is it?"}
              answerState={this.state}
              answers={["Parmesan", "Blue Cheese", "Mozarella", "Other"]}
            />
            <Question
              onClick={this.handleAnswer}
              question={"What temperature is the cheese?"}
              answerState={this.state}
              answers={["Hot", "Cold"]}
            />
            <Question
              onClick={this.handleAnswer}
              question={"What situation is the cheese in?"}
              answerState={this.state}
              answers={["On a pizza", "In a burger", "In a sandwich", "on top of something"]}
            />
          </div>
          {/* <div class="column is-1">
            <Indicator percentage={30} />
          </div> */}
        </div>
      </section>
    );
  }
}

class Question extends Component {
  render() {
    return (
      <div class="column is-12">
        <label class="label">{this.props.question}</label>
        <div class="field is-grouped">
          {this.props.answers.map(answer => (
            <p class="control">
              <a
                class={`button is-dark ${this.props.answerState[this.props.question] !== answer && 'is-outlined'}`}
                onClick={() => this.props.onClick(this.props.question, answer)}>
                {answer}
              </a>
            </p>
          ))}
        </div>
      </div>
    )
  }
}

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;
const MAX_X = 100;
const MAX_Y = 100;
const FULL_RADIUS = 50;
const CENTER_X = 50;
const CENTER_Y = 50;

class Indicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
    };
  }

  componentDidMount = () => {
    if (this.props.initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            percentage: this.props.percentage,
          });
        });
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percentage: nextProps.percentage,
    });
  }

  componentWillUnmount = () => {
    clearTimeout(this.initialTimeout);
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }
  
  getBackgroundPadding = () => {
    if (this.props.background) {
      // default padding to be the same as strokeWidth
      // compare to null because 0 is falsy
      if (this.props.backgroundPadding == null) {
        return this.props.strokeWidth;
      }
      return this.props.backgroundPadding;
    }
    // don't add padding if not displaying background
    return 0;
  }

  getPathDescription = () => {
    const radius = this.getPathRadius();
    const rotation = this.props.counterClockwise ? 1 : 0;

    // Move to center of canvas
    // Relative move to top canvas
    // Relative arc to bottom of canvas
    // Relative arc to top of canvas
    return `
      M ${CENTER_X},${CENTER_Y}
      m 0,-${radius}
      a ${radius},${radius} ${rotation} 1 1 0,${2 * radius}
      a ${radius},${radius} ${rotation} 1 1 0,-${2 * radius}
    `;
  }

  getPathStyles = () => {
    const diameter = Math.PI * 2 * this.getPathRadius();
    const truncatedPercentage = Math.min(Math.max(this.state.percentage, MIN_PERCENTAGE), MAX_PERCENTAGE);
    const dashoffset = ((100 - truncatedPercentage) / 100) * diameter;

    return {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${this.props.counterClockwise ? -dashoffset : dashoffset}px`,
    };
  }

  getPathRadius = () => {
    // the radius of the path is defined to be in the middle, so in order for the path to
    // fit perfectly inside the 100x100 viewBox, need to subtract half the strokeWidth
    return FULL_RADIUS - (this.props.strokeWidth / 2) - this.getBackgroundPadding();
  }
  render() {
    const {
      percentage,
      textForPercentage,
      className,
      classes,
      styles,
      strokeWidth,
    } = this.props;
    const classForPercentage = this.props.classForPercentage ? this.props.classForPercentage(percentage) : '';
    const pathDescription = this.getPathDescription();
    const text = textForPercentage ? textForPercentage(percentage) : null;
    return (
      <svg
        style={{fill:'none', width: '100px'}}
        className={`${className} ${classForPercentage}`} viewBox={`0 0 ${MAX_X} ${MAX_Y}`}
      >
        {
          this.props.background ? (
            <circle
              className={classes.background}
              style={styles.background}
              cx={CENTER_X}
              cy={CENTER_Y}
              r={FULL_RADIUS}
            />
          ) : null
        }

        <path
          className={classes.trail}
          style={styles.trail}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
        />

        <path
          className={classes.path}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
          style={Object.assign({}, styles.path, this.getPathStyles())}
        />

        {
          text ? (
            <text
              className={classes.text}
              style={styles.text}
              x={CENTER_X}
              y={CENTER_Y}
            >
              {text}
            </text>
          ) : null
        }
      </svg>
    )
  }
}

Indicator.defaultProps = {
  strokeWidth: 8,
  className: '',
  classes: {
    root: 'CircularProgressbar',
    trail: 'CircularProgressbar-trail',
    path: 'CircularProgressbar-path',
    text: 'CircularProgressbar-text',
    background: 'CircularProgressbar-background',
  },
  styles: {
    root: {},
    trail: {},
    path: {},
    text: {},
    background: {},
  },
  background: false,
  backgroundPadding: null,
  initialAnimation: false,
  counterClockwise: false,
  classForPercentage: null,
  textForPercentage: (percentage) => `${percentage}%`,
}