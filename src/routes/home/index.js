import { h, Component } from 'preact';
import style from './style.scss';
import { Link } from 'preact-router/match';

export default class Home extends Component {
  render() {

    const styles = {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '3rem 1.5rem'
    }

    return (
      <div style={styles} class="home">
        <div>
          <h1 class="title has-text-white">The Cheese Rules</h1>
          <p class="subtitle has-text-light">a Michael Lowe preference project</p>
          <div class="field is-grouped">
            <p class="control">
              <Link href="/questions" class={`button is-light ${style.button}`}>Begin</Link>
            </p>
            <p class="control">
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/michael-lowe-nz/criteresDeFromage" class="button is-outlined is-light">wtf lol</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
