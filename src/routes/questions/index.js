import { h, Component } from 'preact'
import style from './style.scss'
import Guy from '../../components/guy'
import Indicator from '../../components/indicator'

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
      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-6">
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
            <div class="column is-6">
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Guy />
                <Indicator rating={this.state.rating}/>
              </div>
            </div>
          </div>
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