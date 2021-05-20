window.addEventListener('DOMContentLoaded', function handler() {
  const mountNode = document.querySelector('#router-view');
  function switchRouter() {
    const hashValue = location.hash;
    switch (hashValue) {
      case '#/page1':
        mountNode.textContent = 'page1';
        break;
      case '#/page2':
        mountNode.textContent = 'page2';
        break;
      default:
        mountNode.textContent = 'page1';
        break;
    }
  }

  window.addEventListener('hashchange', switchRouter);
  switchRouter();
});