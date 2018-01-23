import renderList from '../lib/renderList'
import { connect } from '../lib/connect-mixin.js';
import { store } from '../store.js';
import './generic-item'
let template = document.createElement('template');
template.innerHTML = `
<style>
  #overlay {
    height: calc(100vh - 48px);
    width: 100%;
    position: fixed;
    top: 48px;
    left: 0;
    background: #eeeeeea3;
    text-align: center;
    color: #999;
    padding-top: 50vh;
    display: none;
  }
  .loading {
    display: block!important;
  }
  .error {
    display: block!important;
    background: #f58080a3!important;
    color: #000!important;
  }
</style>
<div>
  <div id="content">
  </div>
  <div id="overlay"></div>
</div>
`

class GenericView extends connect(store)(HTMLElement) {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this._state = store.getState();
    this._ready = true;
    
    this._content = shadowRoot.getElementById('content');
    this._overlay = shadowRoot.getElementById('overlay');
  }

  update(state) {
    if (!this._ready) {
      return;
    }
    if (state.data.currentData !== this._state.data.currentData){
      this.updateDatas(state.data.currentData);
    }
    if (state.data.loading !== this._state.data.loading){
      this.updateLoading(state.data.loading, state.data.errMsg);
    }
    this._state = state
  }

  updateDatas = (val) => {
    if (val && val.data && val.data.length > 0) {
      this._content.innerHTML = renderList(val.data, this.generateContent);
    }
  }

  updateLoading = (loading, errMsg) => {
    if (loading) {
      this._overlay.classList.add("loading");
      this._overlay.innerText = 'Loading...';
    } else if (errMsg.length) {
      this._overlay.classList.add("error");
      this._overlay.innerText = errMsg;
    } else {
      this._overlay.classList.remove("error");
      this._overlay.classList.remove("loading");
      this._overlay.innerText = '';
    }
  }

  generateContent = (props) => {
    return `
      <generic-item
        data-url="${props.url}"
        data-title="${props.title}"
        data-domain="${props.domain}"
        data-points="${props.points}"
        data-user="${props.user}"
        data-elapsed="${props.time_ago}"
        data-comments="${props.comments_count}"
        data-type="${this._state.data.datas.url}"
      ></generic-item>
    `
  }
}

window.customElements.define('generic-view', GenericView);
