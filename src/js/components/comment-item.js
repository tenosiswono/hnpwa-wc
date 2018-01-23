import renderList from '../lib/renderList'
import escapeChar from '../lib/escapeChar'

let template = document.createElement('template');
template.innerHTML = `
<style>
  article {
    padding: 8px 0;
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
  #user {
    color: #444;
    font-weight: 700;
  }
  #content {
    border-bottom: 1px solid #666;
  }
</style>
<article id="article">
  <div id="user-detail">
    <span id="user"></span>
    <span id="elapsed"></span>
  </div>
  <div id="content"></div>
  <div id="comments">
  </div>
</article>
`

class CommentItem extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this._article = this.shadowRoot.getElementById('article');
    this._user = this.shadowRoot.getElementById('user');
    this._elapsed = this.shadowRoot.getElementById('elapsed');
    this._content = this.shadowRoot.getElementById('content');
    this._comments = this.shadowRoot.getElementById('comments');
  }

  connectedCallback() {
    this.render(this.dataset)
  }

  render (props) {
    this._user.innerText = props.user;
    this._elapsed.innerText = props.elapsed;
    this._content.innerHTML = props.content;
    this._article.style.marginLeft = `${16 * props.level}px`;
    const comments = JSON.parse(props.comments)
    if (comments.length > 0) {
      this._comments.innerHTML = renderList(comments, this.generateContent)
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

window.customElements.define('comment-item', CommentItem);
