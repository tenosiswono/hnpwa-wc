import './counter-element.js';
import { connect } from '../lib/connect-mixin.js';
import { installRouter } from '../lib/router.js';
import { store } from '../store.js';
import { navigate, increment, decrement } from '../actions/app.js';

let template = document.createElement('template');
template.innerHTML = `
<div>
  <h2>Router</h2>
  <p>Here are some links, to demostrate the basic router. Clicking on the
  link will not do a page refresh, and will update the displayed page in the store. </p>
  <p>
  You're currently on <b><span id="pageSpan"></span></b></p>
  <a href="/demo/">home</a> | <a href="/demo/page1">page1</a> | <a href="/demo/page2">page2</a> | <a href="/demo/page3">page3</a>
  <h2>Basic Redux example</h2>
  <p>This is a demo of a simple counter element, which is <i>not</i> connected to the
  Redux store. It represents a third-party element you could've gotten from an
  element catalog. However, its parent, the main app element, <i>is</i> connected to
  the store and therefore is responsible for syncing the state.<p>
  <counter-element></counter-element>
</div>
`

class MyApp extends connect(store)(HTMLElement) {
  constructor() {
    super();

    // Stamp the template.
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this._counter = shadowRoot.querySelector('counter-element');
    this._page = shadowRoot.getElementById('pageSpan');
    this._loaded = shadowRoot.getElementById('didLoadSpan');
    this._ready = true;

    // Every time the display of the counter updates, we should save
    // these values in the store
    this.addEventListener('counter-incremented', function() {
      store.dispatch(increment());
    });

    this.addEventListener('counter-decremented', function() {
      store.dispatch(decrement());
    });

    // Setup the router. Do this last since this will trigger a store
    // update, and correctly update the UI.
    installRouter(() => store.dispatch(navigate(window.location)));
  }

  update(state) {
    // The store boots up before we have stamped the template.
    if (!this._ready) {
      return;
    }

    // Update the UI.
    this._counter.clicks = state.counter.clicks;
    this._counter.value = state.counter.value;
    this._page.textContent = state.app.page;
  }
}

window.customElements.define('my-app', MyApp);
