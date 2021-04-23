window.addEventListener('load', function () {
  // const allImages = document.querySelectorAll('img');
  // let count = allImages.length;
  // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  // function lazyloadImage() {
  //   const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  //   for (let i = 0; i < allImages.length; i++) {
  //     const offsetHeight = allImages[i].offsetTop;
  //     if (
  //       !allImages[i].dataset.isLoaded &&
  //       scrollTop + clientHeight > offsetHeight
  //     ) {
  //       allImages[i].src = allImages[i].dataset.src;
  //       allImages[i].dataset.isLoaded = true;
  //     }
  //   }
  //   if (count === 0) {
  //     return;
  //   }
  //   allImages.forEach((node) => {
  //     if (
  //       !node.dataset.isLoaded &&
  //       node.getBoundingClientRect().top <= clientHeight
  //     ) {
  //       node.src = node.dataset.src;
  //       node.dataset.isLoaded = true;
  //       count--
  //     }
  //   });
  // }

  // lazyloadImage();

  // function throttle(fn, timeout) {
  //   let preTime = Date.now();
  //   return function (...rest) {
  //     let curTime = Date.now();
  //     if (curTime - preTime > timeout) {
  //       fn.apply(null, rest);
  //     }
  //   }
  // }

  // let _throttle = throttle(lazyloadImage, 1000);

  // window.addEventListener('scroll', _throttle);
  const allImages = document.querySelectorAll('img');
  const loadImage = function (item) {
    item.src = item.dataset.src;
    item.removeAttribute('data-src');
  };

  const intersectionObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImage(item.target);
        observer.unobserve(item.target);
      }
    });
  });

  allImages.forEach((item) => {
    intersectionObserver.observe(item);
  });


  const input = document.querySelector('#input');
  function debounce(fn, delay, immediate = false) {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      if (immediate) {
        let isCallNow = !timer;
        timer = setTimeout(() => {
          timer = null;
        }, delay);
        if (isCallNow) fn.call(this, ...args);
      } else {
        timer = setTimeout(() => {
          fn.call(this, ...args);
        }, delay);
      }
    }
  }

  function log() {
    console.log(this);
  }
  let d = debounce(log, 1000);
  input.addEventListener('input', d);
});