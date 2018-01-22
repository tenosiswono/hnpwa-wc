let template = document.createElement('template');
template.innerHTML = `
<div />
`

class GenericView extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));
  }
  get url() {
    return this.getAttribute('url')
  }
  set url(val) {
    this.setAttribute('url', val);
  }
  get page() {
    return this.getAttribute('page')
  }
  set page(val) {
    this.setAttribute('page', val);
  }
}

window.customElements.define('generic-view', GenericView);
