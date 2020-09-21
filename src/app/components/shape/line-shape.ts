import { ShapeTypes } from './shape-types.enum';
import { Shape } from './shape';

export class LineShape extends Shape {
  protected readonly attributesRequired: string[] = ['p'];
  protected readonly pointsCount: number = 2;

  public points: [[number, number], [number, number]];
  public readonly type: ShapeTypes = ShapeTypes.LINE;

  constructor(points?: number[][], strokeColor?: string) {
    super(points, strokeColor);
  }
}
