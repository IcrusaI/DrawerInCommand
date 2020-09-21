export class AttributeParser {
  public parsePoints(parameter: string): number[][] {
    const points: string[] = parameter.split(/(?<!,) /gm);

    return points.map((point) => this.parsePoint(point));
  }

  protected parsePoint(point: string): number[] {
    let coordinates: number[];
    try {
      coordinates = JSON.parse(point);
    } catch (err) {
      throw new Error('Invalid point syntax');
    }

    if (coordinates.length !== 2) {
      throw new Error('Invalid point syntax');
    }

    if (!coordinates.some((e) => Number.isInteger(e))) {
      throw new Error('Invalid point syntax');
    }

    return coordinates;
  }

  public parseColor(parameter: string): string {
    const s = new Option().style;
    s.color = parameter;

    if (s.color !== parameter) {
      throw new Error('Invalid color syntax');
    }

    return parameter;
  }

  public parseNumber(parameter: string): number {
    const attr: number = Number(parameter);
    if (isNaN(attr) || attr <= 0) {
      throw new Error('Invalid number syntax');
    }

    return attr;
  }
}
