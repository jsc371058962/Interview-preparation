window.addEventListener('DOMContentLoaded', function () {
  const mountNode = document.querySelector('#router-view');
  function popChange() {
    const path = location.pathname;
    switch (path) {
      case '/page1':
        mountNode.textContent = 'page1';
        break;
      case '/page2':
        mountNode.textContent = 'page2';
        break;
      default:
        mountNode.textContent = 'page1';
        break;
    }
  }

  function loaded() {
    popChange();

    const allANodes = document.querySelectorAll('a[href]');
    allANodes.forEach((node) => {
      node.addEventListener('click', function (e) {
        e.preventDefault();

        const href = node.getAttribute('href');
        history.pushState(null, '', href);
        popChange();
      });
    });
  }

  window.addEventListener('popstate', popChange);
  loaded();
});