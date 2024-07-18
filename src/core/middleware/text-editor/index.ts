import type { BoardMiddleware, CoreEventMap, Element, ElementSize, ViewScaleInfo, ElementPosition } from '../../../types';
import { limitAngle, getDefaultElementDetailConfig } from '../../../tools';
export const middlewareEventTextEdit = '@middleware/text-edit';
export const middlewareEventTextChange = '@middleware/text-change';

const textareaBorderColor = '1px solid #00BD81';
const textareaBg = 'rgba(255,255,255,.3)';

type TextEditEvent = {
  element: Element<'text'>;
  position: ElementPosition;
  groupQueue: Element<'group'>[];
  viewScaleInfo: ViewScaleInfo;
};

type TextChangeEvent = {
  element: {
    id: string;
    detail: {
      text: string;
    };
  };
  position: ElementPosition;
};

type ExtendEventMap = Record<typeof middlewareEventTextEdit, TextEditEvent> & Record<typeof middlewareEventTextChange, TextChangeEvent>;

const defaultElementDetail = getDefaultElementDetailConfig();

export const MiddlewareTextEditor: BoardMiddleware<ExtendEventMap, CoreEventMap & ExtendEventMap> = (opts) => {
  const { eventHub, boardContent, viewer } = opts;
  const canvas = boardContent.boardContext.canvas;
  // const textarea = document.createElement('textarea');
  const textarea = document.createElement('div');
  textarea.setAttribute('contenteditable', 'true');
  const canvasWrapper = document.createElement('div');
  const container = opts.container || document.body;
  const mask = document.createElement('div');
  let activeElem: Element<'text'> | null = null;
  let activePosition: ElementPosition = [];

  canvasWrapper.appendChild(textarea);

  canvasWrapper.style.position = 'absolute';
  mask.appendChild(canvasWrapper);

  mask.style.position = 'fixed';
  mask.style.top = '0';
  mask.style.bottom = '0';
  mask.style.left = '0';
  mask.style.right = '0';
  mask.style.display = 'none';
  container.appendChild(mask);

  const showTextArea = (e: TextEditEvent) => {
    resetCanvasWrapper();
    resetTextArea(e);
    mask.style.display = 'block';
  };

  const hideTextArea = () => {
    mask.style.display = 'none';
    activeElem = null;
    activePosition = [];
  };

  const getCanvasRect = () => {
    const clientRect = canvas.getBoundingClientRect() as DOMRect;
    const { left, top, width, height } = clientRect;
    return { left, top, width, height };
  };

  const createBox = (opts: { size: ElementSize; parent: HTMLDivElement }) => {
    const { size, parent } = opts;
    const div = document.createElement('div');
    const { x, y, w, h } = size;
    const angle = limitAngle(size.angle || 0);
    div.style.position = 'absolute';
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.style.width = `${w}px`;
    div.style.height = `${h}px`;
    div.style.transform = `rotate(${angle}deg)`;
    parent.appendChild(div);
    return div;
  };

  const resetTextArea = (e: TextEditEvent) => {
    const { viewScaleInfo, element, groupQueue } = e;
    const { scale, offsetTop, offsetLeft } = viewScaleInfo;

    if (canvasWrapper.children) {
      Array.from(canvasWrapper.children).forEach((child) => {
        child.remove();
      });
    }
    let parent = canvasWrapper;
    for (let i = 0; i < groupQueue.length; i++) {
      const group = groupQueue[i];
      const { x, y, w, h } = group;
      const angle = limitAngle(group.angle || 0);
      const size = {
        x: x * scale,
        y: y * scale,
        w: w * scale,
        h: h * scale,
        angle
      };
      if (i === 0) {
        size.x += offsetLeft;
        size.y += offsetTop;
      }
      parent = createBox({ size, parent });
    }

    const detail = {
      ...defaultElementDetail,
      ...element.detail
    };

    let elemX = element.x * scale + offsetLeft;
    let elemY = element.y * scale + offsetTop;
    let elemW = element.w * scale;
    let elemH = element.h * scale;

    if (groupQueue.length > 0) {
      elemX = element.x * scale;
      elemY = element.y * scale;
      elemW = element.w * scale;
      elemH = element.h * scale;
    }

    let justifyContent: ElementCSSInlineStyle['style']['justifyContent'] = 'center';
    let alignItems = 'center';
    if (detail.textAlign === 'left') {
      justifyContent = 'start';
    } else if (detail.textAlign === 'right') {
      justifyContent = 'end';
    }

    if (detail.verticalAlign === 'top') {
      alignItems = 'start';
    } else if (detail.verticalAlign === 'bottom') {
      alignItems = 'end';
    }

    // 修改文字选中时的样式
    textarea.classList.add("selected-text");
    const styleSheet = new CSSStyleSheet();
    styleSheet.insertRule('.selected-text::selection{background: rgba(25,210,151,.4)}');

    // // Firefox 和 Safari 需要以下步骤才能将样式表应用于文档
    document.adoptedStyleSheets = [styleSheet];

    textarea.style.display = 'inline-flex';
    textarea.style.justifyContent = justifyContent;
    textarea.style.alignItems = alignItems;

    textarea.style.position = 'absolute';
    textarea.style.left = `${elemX - 1}px`;
    textarea.style.top = `${elemY - 1}px`;
    textarea.style.width = `${elemW + 2}px`;
    textarea.style.height = `${elemH + 2}px`;
    textarea.style.transform = `rotate(${limitAngle(element.angle || 0)}deg)`;
    // textarea.style.border = 'none';
    textarea.style.boxSizing = 'border-box';
    textarea.style.border = textareaBorderColor;
    textarea.style.resize = 'none';
    textarea.style.overflow = 'hidden';
    textarea.style.wordBreak = 'break-all';
    textarea.style.background = textareaBg;
    textarea.style.color = '#333333';
    textarea.style.fontSize = `${detail.fontSize * scale}px`;
    if(detail.lineHeight){
      textarea.style.lineHeight = `${detail.lineHeight * scale}px`;
    }
    textarea.style.fontFamily = detail.fontFamily;
    textarea.style.fontWeight = `${detail.fontWeight}`;
    textarea.style.padding = '0';
    textarea.style.margin = '0';
    textarea.style.outline = 'none';

    textarea.innerText = detail.text || '';
    parent.appendChild(textarea);
  };

  const resetCanvasWrapper = () => {
    const { left, top, width, height } = getCanvasRect();
    canvasWrapper.style.position = 'absolute';
    canvasWrapper.style.overflow = 'hidden';
    canvasWrapper.style.top = `${top}px`;
    canvasWrapper.style.left = `${left}px`;
    canvasWrapper.style.width = `${width}px`;
    canvasWrapper.style.height = `${height}px`;
  };

  mask.addEventListener('click', () => {
    hideTextArea();
  });
  textarea.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  textarea.addEventListener('input', () => {
    if (activeElem && activePosition) {
      // activeElem.detail.text = (e.target as any).value || '';
      activeElem.detail.text = textarea.innerText || '';
      eventHub.trigger(middlewareEventTextChange, {
        element: {
          id: activeElem.id,
          detail: {
            text: activeElem.detail.text
          }
        },
        position: [...(activePosition || [])]
      });
      viewer.drawFrame();
    }
  });
  textarea.addEventListener('blur', () => {
    if (activeElem && activePosition) {
      eventHub.trigger(middlewareEventTextChange, {
        element: {
          id: activeElem.id,
          detail: {
            text: activeElem.detail.text
          }
        },
        position: [...activePosition]
      });
    }

    hideTextArea();
  });
  textarea.addEventListener('keydown', (e) => {
    e.stopPropagation();
  });
  textarea.addEventListener('keypress', (e) => {
    e.stopPropagation();
  });
  textarea.addEventListener('keyup', (e) => {
    e.stopPropagation();
  });
  textarea.addEventListener('wheel', (e) => {
    e.stopPropagation();
    e.preventDefault();
  });

  const textEditCallback = (e: TextEditEvent) => {
    if (e?.position && e?.element && e?.element?.type === 'text') {
      activeElem = e.element;
      activePosition = e.position;
    }
    showTextArea(e);
  };

  return {
    name: '@middleware/text-editor',
    use() {
      eventHub.on(middlewareEventTextEdit, textEditCallback);
    },
    disuse() {
      eventHub.off(middlewareEventTextEdit, textEditCallback);
    }
  };
};
