import { CommandTypes } from './command-types.enum';
import { AttributeParser } from '../attribute/attribute-parser';
import {
  Attribute,
  AttributeRaw,
  validAttributes,
} from '../attribute/attribute';

export class Command {
  public type: CommandTypes;
  public attributes: Attribute[];

  private static parseString(str: string): string {
    return str.replace(/\s+/g, ' ').trim();
  }

  parse(command: string): void {
    if (command === '') {
      throw new Error('Invalid command');
    }

    command = Command.parseString(command);

    const [rawType, ...rawAttrs]: string[] = command.split(' -');

    const type: CommandTypes = this.typeParse(rawType);

    const attributes: Attribute[] = rawAttrs.map((attr: string) => {
      const [nameRaw, ...parameterParts] = attr.split(' ');
      const parameterRaw = parameterParts.join(' ');

      return this.attributeParse({ nameRaw, parameterRaw });
    });

    this.type = type;
    this.attributes = attributes;
  }

  protected validateAttribute(
    attribute: string
  ): attribute is Attribute['name'] {
    return validAttributes.includes(attribute as any);
  }

  protected typeParse(type: string): CommandTypes {
    const commandType: CommandTypes = (type as unknown) as CommandTypes;

    if (Object.values(CommandTypes).includes(type)) {
      return commandType;
    } else {
      throw new Error('Invalid type');
    }
  }

  protected attributeParse(data: AttributeRaw): Attribute {
    if (!this.validateAttribute(data.nameRaw)) {
      throw new Error('Invalid attribute name');
    }
    const attribute = data.nameRaw;

    const parser: AttributeParser = new AttributeParser();

    switch (attribute) {
      case 'p': // Points
        return {
          name: attribute,
          parameter: parser.parsePoints(data.parameterRaw),
        };
        break;
      case 'c': // Color
      case 'b': // Background
        return {
          name: attribute,
          parameter: parser.parseColor(data.parameterRaw),
        };
        break;
      case 'r': // Radius
      case 'ry': // Radius Y
      case 'rx': // Radius X
        return {
          name: attribute,
          parameter: parser.parseNumber(data.parameterRaw),
        };
        break;
    }
  }
}
