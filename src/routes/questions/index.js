import { h, Component } from 'preact'
import style from './style.scss'
import Guy from '../../components/guy'
import Indicator from '../../components/indicator'

export default class Questions extends Component {

  handleAnswer = (question, answer) => {
    this.setState({
      [question]: answer,
      rating: 50
    })
  }

  render() {

    const halfColumnStyles = {
      width: '50%',
      height: '100%'
    }

    return (
      <div style={{
        display: 'flex',
      }} class="container">
        <div style={{...halfColumnStyles, padding: '3em 1em'}}>
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
        </div>
        <div style={{
          ...halfColumnStyles,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Guy />
          <Indicator rating={this.state.rating} />
        </div>
      </div>
    );
  }
}

class Question extends Component {
  render() {

    const buttonGroupStyles = {
      flexWrap: 'wrap'
    }

    const buttonStyles = {
      marginBottom: '6px'
    }

    return (
      <div class="column is-12">
        <label class="label">{this.props.question}</label>
        <div style={buttonGroupStyles} class="field is-grouped">
          {this.props.answers.map(answer => (
            <p class="control">
              <a
                style={buttonStyles}
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