import { Command } from '../command/command';
import { Shape } from './shape';
import { ShapeTypes } from './shape-types.enum';

export class EllipseShape extends Shape {
  protected readonly attributesRequired: string[] = ['p', 'rx', 'ry'];
  protected readonly pointsCount: number = 1;

  public points: [[number, number]];
  public readonly type: ShapeTypes = ShapeTypes.ELLIPSE;
  public background: string;
  public radiusY: number;
  public radiusX: number;

  constructor(
    points?: number[][],
    strokeColor?: string,
    background?: string,
    radiusY?: number,
    radiusX?: number
  ) {
    super(points, strokeColor);

    this.background = background;
    this.radiusY = radiusY;
    this.radiusX = radiusX;
  }

  toString(): string {
    return `${super.toString()}, radius: ${this.radiusY}x${this.radiusX}`;
  }

  parse(command: Command): void {
    super.parse(command);

    const { attributes } = command;

    for (const attribute of attributes) {
      switch (attribute.name) {
        // Background
        case 'b':
          this.background = attribute.parameter;
          break;
        // Radius Y
        case 'ry':
          this.radiusY = attribute.parameter;
          break;
        // Radius X
        case 'rx':
          this.radiusX = attribute.parameter;
          break;
      }
    }
  }
}
