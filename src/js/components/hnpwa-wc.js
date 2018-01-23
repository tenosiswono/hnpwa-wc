import './generic-view'
import { connect } from '../lib/connect-mixin.js';
import { installRouter } from '../lib/router.js';
import { store } from '../store.js';
import { navigate, loadApi, setData } from '../actions/app.js';
import renderList from '../lib/renderList'

let template = document.createElement('template');
template.innerHTML = `
<style>
nav {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  height: 48px;
  background-color: #5762D5;
}
section {
  max-width: 1024px;
  margin: 72px auto 50px auto;
  padding: 0 32px;
}
ol {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  list-style: none;
  padding: 0 32px;
}
li a {
  color: #fff;
  text-decoration: none;
  margin: 0 .4rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: .8em;
}
nav a.active {
  background-color: #09147B;
  border-radius: 2px;
}
.logo {
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYxIiBoZWlnaHQ9IjEzMiIgdmlld0JveD0iMCAwIDE2MSAxMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiMyQTNCOEYiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMjlBQkUyIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMCUiIHkxPSI1MCUiIHkyPSI1MCUiIGlkPSJiIj48c3RvcCBzdG9wLWNvbG9yPSIjMkEzQjhGIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzI5QUJFMiIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjEwMCUiIHkxPSI1MCUiIHgyPSIwJSIgeTI9IjUwJSIgaWQ9ImMiPjxzdG9wIHN0b3AtY29sb3I9IiNCNEQ0NEUiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRTdGNzE2IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMTAwJSIgeTE9IjUwJSIgeDI9IjAlIiB5Mj0iNTAlIiBpZD0iZCI+PHN0b3Agc3RvcC1jb2xvcj0iI0I0RDQ0RSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiNFN0Y3MTYiIG9mZnNldD0iMTAwJSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZmlsbD0iIzE2NkRBNSIgZD0iTTE2MC42IDY1LjlsLTE3LjQgMjkuMy0yNC40LTI5LjcgMjQuNC0yOC45eiIvPjxwYXRoIGZpbGw9IiM4RkRCNjkiIGQ9Ik0xNDEuMyAxMDAuMmwtMjYuNS0zMS43LTE1LjkgMjYuNiAyNC43IDM2LjF6Ii8+PHBhdGggZmlsbD0iIzE2NkRBNSIgZD0iTTE0MSAzMS40bC0yNi4yIDMxLjgtMTUuOS0yNi42TDEyMy42Ljl6Ii8+PHBhdGggZmlsbD0idXJsKCNhKSIgb3BhY2l0eT0iLjk1IiBkPSJNNjEuMSAzMS40SDE0MUwxMjMuNC45SDc4Ljd6Ii8+PHBhdGggZmlsbD0idXJsKCNiKSIgb3BhY2l0eT0iLjk1IiBkPSJNMTE0LjggNjMuM0gxNTlsLTE1LjktMjYuOEg5OC44Ii8+PHBhdGggZmlsbD0idXJsKCNjKSIgb3BhY2l0eT0iLjk1IiBkPSJNMTQxLjMgMTAwLjNINjFsMTcuNiAzMC41aDQ1eiIvPjxwYXRoIGZpbGw9IiMwMTAxMDEiIGQ9Ik03OC42IDEzMC44TDQxIDY1LjggNzkuMS44SDM3LjlMLjQgNjUuOGwzNy41IDY1eiIvPjxwYXRoIGZpbGw9InVybCgjZCkiIG9wYWNpdHk9Ii45NSIgZD0iTTExNC44IDY4LjRIMTU5bC0xNS45IDI2LjhIOTguOCIvPjwvZz48L3N2Zz4=');
  background-size: 40px auto;
  background-repeat: no-repeat;
  background-position: center;
}
@media (max-width: 500px) {
  ol {
    padding: 0;
  }
  .logo {
    display: none;
  }
}
</style>
<div>
  <nav>
    <ol id="nav">
    </ol>
  </nav>
  <section>
    <generic-view id="generic-view" />
  </section>
</div>
`

const navItems = [
  {
    title: 'Top',
    url: '/'
  },
  {
    title: 'News',
    url: '/news'
  },
  {
    title: 'Show',
    url: '/show'
  },
  {
    title: 'Ask',
    url: '/ask'
  },
  {
    title: 'Jobs',
    url: '/jobs'
  }
]

class HnpwaWc extends connect(store)(HTMLElement) {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this._genericView = shadowRoot.getElementById('generic-view');
    this._nav = shadowRoot.getElementById('nav');

    this._ready = true;
    this._prevState = store.getState();

    installRouter(() => {
      store.dispatch(navigate(window.location));
    })
  }

  update(state, test) {
    if (!this._ready) {
      return;
    }
    this._nav.innerHTML = `<li class="logo"></li> ${renderList(navItems.map(i => Object.assign(i, { active: i.url === state.app.url })), this.generateNavItem)}`;
    if (state.data.currentData !== this._prevState.data.currentData) {
      this._genericView.properties = { datas: state.data.currentData }
    }
    if (state.app.url !== this._prevState.app.url || ( state.app.url === this._prevState.app.url && state.app.page !== this._prevState.app.page)) {  
      this._prevState = state
      const data = state.data.datas.filter((i) => i.url === state.app.url && i.page === state.app.page && i.expiry > Date.now());
      if (data.length === 0) {
        store.dispatch(loadApi(state.app.url, state.app.page))
      } else {
        store.dispatch(setData(data[0]))
      }
    }
  }

  generateNavItem = (props) => {
    const { title, url, active} = props;
    return `
      <li class="nav-item">
        <a
          aria-label="${title}"
          aria-current="${active ? 'true' : 'false'}"
          href="${url}"
          class="${active ? 'active' : ''}"
        >
          ${title}
        </a>
      </li>
    `
  }
}

window.customElements.define('hnpwa-wc', HnpwaWc);
