import { h, Component } from 'preact';
import style from './style.scss';

export default class Questions extends Component {
  render() {
    return (
      <section class="section main">
        <div class="container">
          <div class="columns is-multiline">




            <div class="column is-12">
              <label class="label">Is the situation the cheese is in</label>
              <div class="field is-grouped">
                <p class="control">
                  <a class="button is-outlined is-light">a Pizza</a>
                </p>
                <p class="control">
                  <a class="button is-outlined is-light">a Cheese Scone</a>
                </p>
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
            <a class="button is-outlined is-light">answer</a>
          </p>
        ))}
        </div>
      </div>
    )
  }
}