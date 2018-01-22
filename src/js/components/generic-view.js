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

  get datas() {
    let s = this.getAttribute('datas');
    return s ? JSON.parse(s) : [];
  }

  set datas(val) {
    this.setAttribute('datas', JSON.stringify(val));
    this.updateDatas(val);
  }

  updateDatas = (val) => {
    if (val) {
      this._content.innerHTML = val.data.reduce((p, i, index) => (index > 1 ? p : this.generateContent(p.title, p.user)) + this.generateContent(i.title, i.user))
    }
  }

  generateContent = (title, user) => `
    <h2>${title}</h2>
    <p>${user}</p>
  `
}

window.customElements.define('generic-view', GenericView);
