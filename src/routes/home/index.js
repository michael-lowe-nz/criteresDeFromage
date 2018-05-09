import { h, Component } from 'preact';
import './style.scss';

export default class Home extends Component {
  render() {
    return (
      <section class="section main">
        <div class="container">
          <h1 class="title has-text-white">The Cheese Rules</h1>
          <p class="subtitle has-text-light">a Michael Lowe preference project</p>
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-primary">Begin</a>
            </p>
            <p class="control">
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/michael-lowe-nz/criteresDeFromage" class="button is-outlined is-primary">Wtf lol</a>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
