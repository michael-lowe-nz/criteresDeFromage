import { h, Component } from 'preact'
import style from './style.module.scss'
import Guy from '../../components/guy.jsx'
import Indicator from '../../components/indicator.jsx'
import questionsData from './data.jsx'

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 50,
      failedQuestion: null
    };
  }

  calculateRating = () => {
    const answers = this.state;
    let totalScore = 0;
    let totalWeight = 0;
    let hasNegativeAnswer = false;

    questionsData.forEach(question => {
      const answer = answers[question.text];
      if (answer) {
        if (answer.value === -1) {
          hasNegativeAnswer = true;
        }
        totalScore += answer.value * question.weight;
        totalWeight += question.weight;
      }
    });

    if (hasNegativeAnswer) {
      return 0;
    }

    if (totalWeight === 0) return 50; // Default rating

    // Convert to percentage (0-100)
    const normalizedScore = (totalScore / totalWeight + 1) / 2; // Convert from [-1,1] to [0,1]
    return Math.round(normalizedScore * 100);
  }

  handleAnswer = (question, answer) => {
    const newState = {
      [question]: answer
    };

    // Check if this answer has value -1
    if (answer.value === -1) {
      newState.failedQuestion = question;
      newState.rating = 0;
    } else {
      // If we were in a failed state and now selected a good answer, clear the failed state
      if (this.state.failedQuestion === question) {
        newState.failedQuestion = null;
      }

      // Recalculate rating
      const tempState = { ...this.state, ...newState };
      newState.rating = this.calculateRating.call({ state: tempState });
    }

    this.setState(newState);
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
        <div style={{ ...halfColumnStyles, padding: '3em 1em' }}>
          <div class="columns is-multiline">
            {this.state.failedQuestion ? (
              <>
                <div class="column is-12">
                  <div class="notification is-danger">
                    <h3 class="title is-4">Oh no! 😞</h3>
                    <p>This cheese situation is not acceptable. Change your answer below to continue:</p>
                  </div>
                </div>
                <Question
                  key={this.state.failedQuestion}
                  onClick={this.handleAnswer}
                  answerState={this.state}
                  question={this.state.failedQuestion}
                  answers={questionsData.find(q => q.text === this.state.failedQuestion).answers}
                />
              </>
            ) : (
              questionsData.map(question => (
                <Question
                  key={question.text}
                  onClick={this.handleAnswer}
                  answerState={this.state}
                  question={question.text}
                  answers={question.answers}
                />
              ))
            )}
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
          <Guy isFrowning={this.state.rating === 0} />
          <Indicator
            rating={this.state.rating || 50}
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