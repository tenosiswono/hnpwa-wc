import renderList from '../lib/renderList'
import './generic-item'
let template = document.createElement('template');
template.innerHTML = `
<div>
  <div id="content">
  </div>
</div>
`

class GenericView extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));
    
    this._content = shadowRoot.getElementById('content');
  }

  set properties(props) {
    this.datas = props.datas
    this.updateDatas(this.datas);
  }

  updateDatas = (val) => {
    if (val) {
      this._content.innerHTML = renderList(val.data, this.generateContent);
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
        data-type="${this.datas.url}"
      ></generic-item>
    `
  }
}

window.customElements.define('generic-view', GenericView);
