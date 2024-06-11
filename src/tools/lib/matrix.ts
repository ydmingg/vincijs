import type { Matrix } from '../../types';

export function matrixToRadian(matrix: Matrix): number | null {
  if (matrix[1] != -1 * matrix[3] || matrix[4] != matrix[0] || matrix[0] * matrix[4] - matrix[3] * matrix[1] != 1) {
    return null;
  } else {
    return Math.acos(matrix[0]);
  }
}

export function matrixToAngle(matrix: Matrix): number | null {
  const radian = matrixToRadian(matrix);
  if (typeof radian === 'number') {
    const angle = (radian * 180) / Math.PI;
    return angle;
  }
  return radian;
}
