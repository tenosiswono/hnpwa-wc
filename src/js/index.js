if (!('import' in document.createElement('link'))) {
  window.addEventListener('WebComponentsReady', _ => {
    require("./components/hnpwa-wc");
  });
} else {
  require("./components/hnpwa-wc");
}
