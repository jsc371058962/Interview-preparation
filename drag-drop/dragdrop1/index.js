// 使用的是mousedown, mousemove, mouseup
window.addEventListener('DOMContentLoaded', function() {
  // 定义一个方法，使的某个元素就可以拥有拖动功能
  // 动态算出元素的letf，top还有需要修正的偏差
  function DragDrop() {
    let draggingTarget = null;
    // 需要放在外边防止mousemove时被写回
    let diffX, diffY;

    function handler(evt) {
      const { type, target, clientX, clientY } = evt;

      switch (type) {
        case 'mousedown':
          if (target.classList.contains('draggable')) {
            draggingTarget = target;
            diffX = clientX - target.offsetLeft;
            diffY = clientY - target.offsetTop;
          }
          break;
        case 'mousemove':
          if (draggingTarget) {
            target.style.top = `${clientY - diffY}px`;
            target.style.left = `${clientX - diffX}px`;
          }
          break;
        case 'mouseup':
          if (draggingTarget) {
            draggingTarget = null;
          }
        default:
          break;
      }
    }
    return {
      attachListener(element) {
        element.addEventListener('mousedown', handler);
        element.addEventListener('mousemove', handler);
        element.addEventListener('mouseup', handler);
      },
      removeListener(element) {
        element.removeEventListener('mousedown', handler);
        element.removeEventListener('mousemove', handler);
        element.removeEventListener('mouseup', handler);
      }
    }
  }

  const ele = document.querySelector('.draggable');
  const dragDropObj = DragDrop();
  // 使某个元素拥有拖放功能
  dragDropObj.attachListener(ele);
});