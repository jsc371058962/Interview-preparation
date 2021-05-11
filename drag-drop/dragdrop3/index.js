window.addEventListener('DOMContentLoaded', function() {

  function DragDrop() {
    let draggingTarget = null;
    let diffX, diffY;

    function handler(evt) {
      const { type, target, clientX, clientY } = evt;

      switch (type) {
        case 'mousedown':
          if (target.classList.contains('draggable')) {
            // 在点击的时候才计算差值
            draggingTarget = target;
            diffX = clientX - target.offsetLeft;
            diffY = clientY - target.offsetTop;
          }
          break;
        case 'mousemove':
          if (draggingTarget) {
            target.style.left = `${clientX - diffX}px`;
            target.style.top = `${clientY - diffY}px`;
          }
          break;
        case 'mouseup':
          if (draggingTarget) {
            draggingTarget = null;
          }
          break;
        default:
          break;
      }
    }
    return {
      attach(element) {
        element.addEventListener('mousedown', handler);
        element.addEventListener('mousemove', handler);
        element.addEventListener('mouseup', handler);
      },
      dettach(element) {
        element.removeEventListener('mousedown', handler);
        element.removeEventListener('mousemove', handler);
        element.removeEventListener('mouseup', handler);
      }
    };
  }

  const element = document.querySelector('.draggable');
  const { attach, dettach } = DragDrop();
  attach(element);
});