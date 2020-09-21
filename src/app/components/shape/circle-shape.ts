import { Command } from '../command/command';
import { Shape } from './shape';
import { ShapeTypes } from './shape-types.enum';

export class CircleShape extends Shape {
  protected readonly attributesRequired: string[] = ['p', 'r'];
  protected readonly pointsCount: number = 1;

  public points: [[number, number]];
  public readonly type: ShapeTypes = ShapeTypes.CIRCLE;
  public background: string;
  public radius: number;

  constructor(
    points?: number[][],
    strokeColor?: string,
    background?: string,
    radius?: number
  ) {
    super(points, strokeColor);

    this.background = background;
    this.radius = radius;
  }

  toString(): string {
    return `${super.toString()}, radius: ${this.radius}`;
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
        // Radius
        case 'r':
          this.radius = attribute.parameter;
          break;
      }
    }
  }
}
