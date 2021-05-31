window.addEventListener('DOMContentLoaded', function() {
  console.log(12345);
});
console.log(111111);
const body = document.querySelector('body');
const scriptTag = document.createElement('script');
scriptTag.src = './index2.js';
body.appendChild(scriptTag);
window.setTimeout(() => {
  console.log(121212121);
}, 1000);
