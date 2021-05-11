function DragDrop() {
  let dragging = null;
  let diffX, diffY;
  function handler(e) {
    const { type, target, clientX, clientY } = e;
    switch (type) {
      case 'mousedown':
        if (target.classList.contains('draggable')) {
          dragging = target;
          diffX = clientX - target.offsetLeft;
          diffY = clientY - target.offsetTop;
        }
        break;
      case 'mousemove':
        if (dragging) {
          target.style.top = `${clientY - diffY}px`;
          target.style.left = `${clientX - diffX}px`
        }
        break;
      case 'mouseup':
        if (dragging) {
          dragging = null;
        }
      default:
        break;
    }
  }
  return {
    attach(element) {
      element.addEventListener('mousedown', handler);
      element.addEventListener('mousemove', handler);
      element.addEventListener('mouseup', handler);
    }
  }
}

const element = document.querySelector('.draggable');
DragDrop().attach(element);
