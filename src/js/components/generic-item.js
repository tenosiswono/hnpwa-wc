import renderList from '../lib/renderList'

let template = document.createElement('template');
template.innerHTML = `
<style>
  article {
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  #title {
    margin: 0 0 4px 0;
  }
  #domain {
    color: #555;
  }
  #comments {
    text-decoration: underline;
  }
</style>
<article>
  <a target="_blank" rel="noopener external" id="url">
    <h3 id="title">
    </h3>
    <span id="domain"></span>
  </a>
  <div id="details">
    <span id="points"></span>
    <span id="user"></span>
    <span id="elapsed"></span>
    <a id="comments"></a>
  </div>
</article>
`

class GenericItem extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this._url = this.shadowRoot.getElementById('url');
    this._details = this.shadowRoot.getElementById('details');
    this._title = this.shadowRoot.getElementById('title');
    this._domain = this.shadowRoot.getElementById('domain');
    this._points = this.shadowRoot.getElementById('points');
    this._user = this.shadowRoot.getElementById('user');
    this._elapsed = this.shadowRoot.getElementById('elapsed');
    this._comments = this.shadowRoot.getElementById('comments');
  }

  connectedCallback() {
    this.render(this.dataset)
  }

  render (props) {
    this._url.href = props.url;
    this._title.innerText = props.title;
    this._domain.innerText = props.domain;
    this._points.innerText = `${props.points} points`;
    this._user.innerText = `by ${props.user}`;
    this._elapsed.innerText = props.elapsed;
    this._comments.innerText = props.comments > 0 ? `${props.comments} comments` : 'discus' ;
    if (props.type === '/jobs') {
      this._details.removeChild(this._points)
      this._details.removeChild(this._user)
    }
  }

}

window.customElements.define('generic-item', GenericItem);
