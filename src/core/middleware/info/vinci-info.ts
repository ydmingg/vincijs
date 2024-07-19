import type { PointSize, ViewContext2D, MiddlewareInfoStyle } from '../../../types';
import { rotateByCenter } from '../../../tools';

const fontFamily = 'monospace';

export function drawSizeInfoText(
  ctx: ViewContext2D,
  opts: { point: PointSize; rotateCenter: PointSize; angle: number; text: string; fontSize: number; lineHeight: number; color: string; background: string, style: MiddlewareInfoStyle }
) {
  const { point, rotateCenter, angle, text, color, background, fontSize, lineHeight, style } = opts;
  const { textColor, textBackground } = style;

  rotateByCenter(ctx, angle, rotateCenter, () => {
    ctx.$setFont({
      fontWeight: '300',
      fontSize,
      fontFamily
    });
    const padding = (lineHeight - fontSize) / 2;
    const textWidth = ctx.$undoPixelRatio(ctx.measureText(text).width);
    const bgStart = {
      x: point.x - textWidth / 2 - padding,
      y: point.y
    };
    const bgEnd = {
      x: bgStart.x + textWidth + padding * 2,
      y: bgStart.y + fontSize + padding
    };
    const textStart = {
      x: point.x - textWidth / 2,
      y: point.y
    };
    ctx.setLineDash([]);
    ctx.fillStyle = textBackground
    // ctx.fillStyle = background;
    ctx.beginPath();
    ctx.moveTo(bgStart.x, bgStart.y);
    ctx.lineTo(bgEnd.x, bgStart.y);
    ctx.lineTo(bgEnd.x, bgEnd.y);
    ctx.lineTo(bgStart.x, bgEnd.y);
    ctx.closePath();
    ctx.fill();

    // ctx.fillStyle = color;
    ctx.fillStyle = textColor
    ctx.textBaseline = 'top';
    ctx.fillText(text, textStart.x, textStart.y + padding);
  });
}

export function drawPositionInfoText(
  ctx: ViewContext2D,
  opts: { point: PointSize; rotateCenter: PointSize; angle: number; text: string; fontSize: number; lineHeight: number; color: string; background: string, style: MiddlewareInfoStyle }
) {
  const { point, rotateCenter, angle, text, color, background, fontSize, lineHeight, style } = opts;
  const { textBackground, textColor } = style;

  rotateByCenter(ctx, angle, rotateCenter, () => {
    ctx.$setFont({
      fontWeight: '300',
      fontSize,
      fontFamily
    });
    const padding = (lineHeight - fontSize) / 2;
    const textWidth = ctx.$undoPixelRatio(ctx.measureText(text).width);
    const bgStart = {
      x: point.x,
      y: point.y
    };
    const bgEnd = {
      x: bgStart.x + textWidth + padding * 2,
      y: bgStart.y + fontSize + padding
    };
    const textStart = {
      x: point.x + padding,
      y: point.y
    };
    ctx.setLineDash([]);
    // ctx.fillStyle = background;
    ctx.fillStyle = textBackground
    ctx.beginPath();
    ctx.moveTo(bgStart.x, bgStart.y);
    ctx.lineTo(bgEnd.x, bgStart.y);
    ctx.lineTo(bgEnd.x, bgEnd.y);
    ctx.lineTo(bgStart.x, bgEnd.y);
    ctx.closePath();
    ctx.fill();

    // ctx.fillStyle = color;
    ctx.fillStyle = textColor
    ctx.textBaseline = 'top';
    ctx.fillText(text, textStart.x, textStart.y + padding);
  });
}

export function drawAngleInfoText(
  ctx: ViewContext2D,
  opts: { point: PointSize; rotateCenter: PointSize; angle: number; text: string; fontSize: number; lineHeight: number; color: string; background: string, style: MiddlewareInfoStyle }
) {
  const { point, rotateCenter, angle, text, color, background, fontSize, lineHeight, style } = opts;
  const { textBackground, textColor } = style;

  rotateByCenter(ctx, angle, rotateCenter, () => {
    ctx.$setFont({
      fontWeight: '300',
      fontSize,
      fontFamily
    });
    const padding = (lineHeight - fontSize) / 2;
    const textWidth = ctx.$undoPixelRatio(ctx.measureText(text).width);
    const bgStart = {
      x: point.x,
      y: point.y
    };
    const bgEnd = {
      x: bgStart.x + textWidth + padding * 2,
      y: bgStart.y + fontSize + padding
    };
    const textStart = {
      x: point.x + padding,
      y: point.y
    };
    ctx.setLineDash([]);
    // ctx.fillStyle = background;
    ctx.fillStyle = textBackground
    ctx.beginPath();
    ctx.moveTo(bgStart.x, bgStart.y);
    ctx.lineTo(bgEnd.x, bgStart.y);
    ctx.lineTo(bgEnd.x, bgEnd.y);
    ctx.lineTo(bgStart.x, bgEnd.y);
    ctx.closePath();
    ctx.fill();

    // ctx.fillStyle = color;
    ctx.fillStyle = textColor
    ctx.textBaseline = 'top';
    ctx.fillText(text, textStart.x, textStart.y + padding);
  });
}
