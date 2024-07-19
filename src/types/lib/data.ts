import type { Element, ElementType, ElementAssets, ElementSize, ElementGroupDetail } from './element';

// 定义Data的类型是一个数组
export type Data = Element<ElementType>[]

export type Matrix = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export type Elements = Element<ElementType>[];

export type ColorMatrix = Matrix;
