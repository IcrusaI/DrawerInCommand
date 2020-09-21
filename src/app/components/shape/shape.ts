import { Command } from '../command/command';
import { ShapeTypes } from './shape-types.enum';

export abstract class Shape {
  protected abstract readonly attributesRequired: string[];
  protected abstract readonly pointsCount: number;

  public readonly type: ShapeTypes;
  public points: number[][];
  public strokeColor: string;
  public countPoints: number;

  protected constructor(points?: number[][], strokeColor?: string) {
    this.points = points;
    this.strokeColor = strokeColor;
  }

  toString(): string {
    return `${this.type} ${JSON.stringify(this.points)}`;
  }

  parse(command: Command): void {
    const { attributes } = command;

    for (const attributeName of this.attributesRequired) {
      if (attributes.find((e) => e.name === attributeName) === undefined) {
        throw new Error(`No required attribute: ${attributeName}`);
      }
    }

    for (const attribute of attributes) {
      switch (attribute.name) {
        // Points
        case 'p':
          if (this.pointsCount !== attribute.parameter.length) {
            throw new Error(`Requires ${this.pointsCount} points`);
          }

          this.points = attribute.parameter;
          break;
        // Color
        case 'c':
          this.strokeColor = attribute.parameter;
          break;
      }
    }
  }
}
