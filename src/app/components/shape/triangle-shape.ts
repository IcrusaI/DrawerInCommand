import { Command } from '../command/command';
import { Shape } from './shape';
import { ShapeTypes } from './shape-types.enum';

export class TriangleShape extends Shape {
  protected readonly attributesRequired: string[] = ['p'];
  protected readonly pointsCount: number = 3;

  public points: [[number, number], [number, number], [number, number]];
  public readonly type: ShapeTypes = ShapeTypes.TRIANGLE;
  public background: string;

  constructor(points?: number[][], strokeColor?: string, background?: string) {
    super(points, strokeColor);

    this.background = background;
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
      }
    }
  }
}
