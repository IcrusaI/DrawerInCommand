const validAttributePoints = ['p'] as const;
const validAttributeColor = ['c', 'b'] as const;
const validAttributeNumber = ['r', 'ry', 'rx'] as const;
export const validAttributes = [
  ...validAttributePoints,
  ...validAttributeColor,
  ...validAttributeNumber,
] as const;

export interface AttributeRaw {
  nameRaw: string;
  parameterRaw: string;
}

export interface AttributePoints {
  name: typeof validAttributePoints[number];
  parameter: number[][];
}

export interface AttributeColor {
  name: typeof validAttributeColor[number];
  parameter: string;
}

export interface AttributeNumber {
  name: typeof validAttributeNumber[number];
  parameter: number;
}

export type Attribute = AttributePoints | AttributeColor | AttributeNumber;
