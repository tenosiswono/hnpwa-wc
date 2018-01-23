import renderList from '../lib/renderList'
import escapeChar from '../lib/escapeChar'
import { connect } from '../lib/connect-mixin.js';
import { store } from '../store.js';
import './comment-item'

let template = document.createElement('template');
template.innerHTML = `
<style>
  a {
    text-decoration: none;
    color: #333;
  }
  #overlay {
    height: calc(100vh - 48px);
    width: 100%;
    position: fixed;
    top: 48px;
    left: 0;
    background: #eee;
    text-align: center;
    color: #999;
    padding-top: 50vh;
    display: none;
  }
  #title {
    margin: 0 0 4px 0;
  }
  #points {
    padding: 0 0 0 16px;
  }
  #content {
    margin: 16px 0;
    padding: 16px;
    background: #f9f9f9;
  }
  #comments-count {
    padding: 0 0 8px 0;
    margin: 0 0 8px 0;
    border-bottom: 1px solid;
  }
  #user {
    color: #444;
    font-weight: 700;
  }
  .loading {
    display: block!important;
  }
  .error {
    display: block!important;
    background: #f58080!important;
    color: #000!important;
  }
</style>
<div>
  <a target="_blank" rel="noopener external" id="url"><h3 id="title"></h3></a>
  <div id="details">
    <span id="user"></span>
    <span id="elapsed"></span>
    <span id="points"></span>
  </div>
  <div id="content"></div>
  <div id="commnent">
    <div id="comments-count">Comments</div>
    <div id="comment-list">
    </div>
    <div id="overlay"></div>
  </div>
</div>
`

class CommentView extends connect(store)(HTMLElement) {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this._state = store.getState();
    this._ready = true;
    
    this._url = this.shadowRoot.getElementById('url');
    this._title = shadowRoot.getElementById('title');
    this._details = shadowRoot.getElementById('details');
    this._points = shadowRoot.getElementById('points');
    this._user = shadowRoot.getElementById('user');
    this._elapsed = shadowRoot.getElementById('elapsed');
    this._content = shadowRoot.getElementById('content');
    this._commnent = shadowRoot.getElementById('commnent');
    this._commentsCount = shadowRoot.getElementById('comments-count');
    this._commentList = shadowRoot.getElementById('comment-list');
    this._overlay = shadowRoot.getElementById('overlay');
  }

  update(state) {
    if (!this._ready) {
      return;
    }
    if (state.app.url === '/item') {
      if (state.data.currentData !== this._state.data.currentData){
        this.updateDatas(state.data.currentData.data);
      }
      if (state.data.loading !== this._state.data.loading){
        this.updateLoading(state.data.loading, state.data.errMsg);
      }
    }
    this._state = state
  }

  updateDatas = (item) => {
    this._url.href = item.url || '';
    this._title.innerText = item.title || ''
    if (item.user) {
      this._user.innerText = `By ${item.user || ''}`
      this._points.innerText = `${item.points || ''} ★`
    }
    this._elapsed.innerText = item.time_ago || ''
    this._content.innerHTML = item.content || 'No Content'
    if (item.comments.length > 0) {
      this._commentList.innerHTML = renderList(item.comments, this.generateContent)
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
      <comment-item
        data-comments="${escapeChar(JSON.stringify(props.comments))}"
        data-content="${escapeChar(props.content)}"
        data-level="${props.level}"
        data-elapsed="${props.time_ago}"
        data-user="${props.user}"
        data-level="${props.level}"
      ></comment-item>
    `
  }
}

window.customElements.define('comment-view', CommentView);
