window.addEventListener('DOMContentLoaded', () => {
  function createLiNodes() {
    const arrString = new Array(10000).fill("<li class='target'>111111111</li>").join('');
    const ulNode = document.querySelector('.container');
    ulNode.innerHTML = arrString;
  }

  createLiNodes();
  const allLis = document.querySelectorAll('.target');
  const changeColor = function (node) {
    // node.style.backgroundColor = 'red';
    node.classList.add('red');
  };
  const intersectionObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        changeColor(item.target);
        observer.unobserve(item.target);
      }
    });
  });

  allLis.forEach((item) => {
    intersectionObserver.observe(item);
  });
});
