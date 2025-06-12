// src/directives/dialogDragResize.js
export default {
    bind(el, binding, vnode) {
      const dialogHeaderEl = el.querySelector('.el-dialog__header');
      const dragDom = el.querySelector('.el-dialog');

      if (!dialogHeaderEl || !dragDom) return;

      // 拖动
      dialogHeaderEl.style.cursor = 'move';
      dialogHeaderEl.onmousedown = (e) => {
        const disX = e.clientX - dragDom.offsetLeft;
        const disY = e.clientY - dragDom.offsetTop;

        dragDom.style.margin = '0';
        dragDom.style.position = 'absolute';

        document.onmousemove = (e) => {
          dragDom.style.left = e.clientX - disX + 'px';
          dragDom.style.top = e.clientY - disY + 'px';
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };

      // 缩放（右下角）
      const resizeHandle = document.createElement('div');
      resizeHandle.style.width = '10px';
      resizeHandle.style.height = '10px';
      resizeHandle.style.position = 'absolute';
      resizeHandle.style.right = '0';
      resizeHandle.style.bottom = '0';
      resizeHandle.style.cursor = 'se-resize';
      resizeHandle.style.zIndex = '1000';
      resizeHandle.className = 'dialog-resize-handle';
      dragDom.appendChild(resizeHandle);

      resizeHandle.onmousedown = (e) => {
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = dragDom.offsetWidth;
        const startHeight = dragDom.offsetHeight;

        document.onmousemove = (moveEvent) => {
          const newWidth = startWidth + (moveEvent.clientX - startX);
          const newHeight = startHeight + (moveEvent.clientY - startY);
          dragDom.style.width = newWidth + 'px';
          dragDom.style.height = newHeight + 'px';
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  };
