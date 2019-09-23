import { h, Component } from 'preact'
import style from './style.scss'
import Guy from '../../components/guy'
import Indicator from '../../components/indicator'
import questionsData from './data'

export default class Questions extends Component {

  handleAnswer = (question, answer) => {
    this.setState({
      [question]: answer,
      rating: 50,
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
            {questionsData.map(question =>(
              <Question
                onClick={this.handleAnswer}
                answerState={this.state}
                question={question.text}
                answers={question.answers}
              />
            ))}
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
          <Indicator
            rating={this.state.rating}
          />
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
        <div style={buttonGroupStyles} className="field is-grouped">
          {this.props.answers.map(answer => (
            <p class="control">
              <a
                style={buttonStyles}
                class={`button is-dark ${this.props.answerState[this.props.question] !== answer && 'is-outlined'}`}
                onClick={() => this.props.onClick(this.props.question, answer)}>
                {answer.label}
              </a>
            </p>
          ))}
        </div>
      </div>
    )
  }
}