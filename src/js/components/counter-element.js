let template = document.createElement('template');
template.innerHTML = `
<p>
  Clicked: <b><span id="clicksSpan"></span></b> times. Value is <b><span id="valueSpan"></span></b>.
  <button id="plus">+</button>
  <button id="minus">-</button>
</p>
`

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class CounterElement extends HTMLElement {
  constructor() {
    super();

    // Stamp the template.
    let shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    shadowRoot.getElementById('plus').addEventListener('click', () => {this._onIncrement()});
    shadowRoot.getElementById('minus').addEventListener('click', () => {this._onDecrement()});

    // Initial values.
    this.clicks = 0; // The total number of clicks you've done.
    this.value = 0;  // The current value of the counter.
    this._show();
  }

  _onIncrement() {
    this.value++;
    this.clicks++;
    this._show();
    this.dispatchEvent(new CustomEvent('counter-incremented',
        {bubbles: false, composed: true}));
  }

  _onDecrement() {
    this.value--;
    this.clicks++;
    this._show();
    this.dispatchEvent(new CustomEvent('counter-decremented',
        {bubbles: false, composed: true}));
  }

  _show() {
    this.shadowRoot.getElementById('clicksSpan').textContent = this.clicks;
    this.shadowRoot.getElementById('valueSpan').textContent = this.value;
  }
}

window.customElements.define('counter-element', CounterElement);
