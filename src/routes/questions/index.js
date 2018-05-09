import { h, Component } from 'preact';
import style from './style.scss';

export default class Questions extends Component {
  state = {mike: 'helsinki'}

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

