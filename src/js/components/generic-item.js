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

    this.urlElem = this.shadowRoot.getElementById('url');
    this.detailsElem = this.shadowRoot.getElementById('details');
    this.titleElem = this.shadowRoot.getElementById('title');
    this.domainElem = this.shadowRoot.getElementById('domain');
    this.pointsElem = this.shadowRoot.getElementById('points');
    this.userElem = this.shadowRoot.getElementById('user');
    this.elapsedElem = this.shadowRoot.getElementById('elapsed');
    this.commentsElem = this.shadowRoot.getElementById('comments');
  }

  connectedCallback() {
    this.render(this.dataset)
  }

  render (props) {
    this.urlElem.href = props.url;
    this.titleElem.innerText = props.title;
    this.domainElem.innerText = props.domain;
    this.pointsElem.innerText = `${props.points} points`;
    this.userElem.innerText = `by ${props.user}`;
    this.elapsedElem.innerText = props.elapsed;
    this.commentsElem.innerText = props.comments > 0 ? `${props.comments} comments` : 'discus' ;
    if (props.type === '/jobs') {
      this.detailsElem.removeChild(this.pointsElem)
      this.detailsElem.removeChild(this.userElem)
    }
  }

}

window.customElements.define('generic-item', GenericItem);
