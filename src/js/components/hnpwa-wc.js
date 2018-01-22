import './generic-view'
import { connect } from '../lib/connect-mixin.js';
import { installRouter } from '../lib/router.js';
import { store } from '../store.js';
import { navigate, loadApi } from '../actions/app.js';

let template = document.createElement('template');
template.innerHTML = `
<div>
  <a href="/?page=1">Top</a> | <a href="/news?page=1">News</a> | <a href="/show?page=1">Show</a> | <a href="/ask?page=1">Ask</a> | <a href="/jobs?page=1">Jobs</a>
  <generic-view id="generic-view" />
</div>
`

class HnpwaWc extends connect(store)(HTMLElement) {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this._genericView = shadowRoot.getElementById('generic-view');

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
    if (state.app.url !== this._prevState.app.url || ( state.app.url === this._prevState.app.url && state.app.page !== this._prevState.app.page)) {
      if (state.data.datas.filter((i) => i.url === state.app.url && i.page === state.app.page && i.expiry > Date.now()).length === 0) {
        store.dispatch(loadApi(state.app.url, state.app.page))
      }
    }
    this._prevState = state
  }
}

window.customElements.define('hnpwa-wc', HnpwaWc);
