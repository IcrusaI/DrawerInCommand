import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TriangleShape } from '../components/shape/triangle-shape';
import { CommandTypes } from '../components/command/command-types.enum';
import { ShapeTypes } from '../components/shape/shape-types.enum';
import { Shape } from '../components/shape/shape';
import { RectangleShape } from '../components/shape/rectangle-shape';
import { CircleShape } from '../components/shape/circle-shape';
import { EllipseShape } from '../components/shape/ellipse-shape';
import { LineShape } from '../components/shape/line-shape';
import { Command } from '../components/command/command';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  public title = 'Drawer';
  public coordinatesCursor = '';
  public context: CanvasRenderingContext2D;

  public commandForm;
  public shapes: Shape[] = [];

  constructor() {
    this.commandForm = new FormGroup({
      command: new FormControl(
        'ellipse -p [75, 75] -rx 50 -ry 25 -c rgb(0, 255, 0) -b rgba(255, 0, 0, 0.3)',
        [Validators.required]
      ),
    });
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.setCanvasSize();
  }

  onSubmit(customerData: { command: string }): void {
    const command: Command = new Command();

    try {
      command.parse(customerData.command);
    } catch (e) {
      alert(e.message);
      return;
    }

    let shape: Shape;

    switch (command.type) {
      case CommandTypes.LINE:
        shape = new LineShape();
        break;
      case CommandTypes.CIRCLE:
        shape = new CircleShape();
        break;
      case CommandTypes.ELLIPSE:
        shape = new EllipseShape();
        break;
      case CommandTypes.RECTANGLE:
        shape = new RectangleShape();
        break;
      case CommandTypes.TRIANGLE:
        shape = new TriangleShape();
        break;
    }

    shape.parse(command);

    this.draw(shape);

    this.shapes.push(shape);

    this.commandForm.reset();
  }

  draw(shape: Shape): void {
    this.context.beginPath();
    this.context.strokeStyle = shape.strokeColor;

    switch (shape.type) {
      case ShapeTypes.LINE:
        const lineShape: LineShape = shape as LineShape;

        this.context.moveTo(...lineShape.points[0]);
        this.context.lineTo(...lineShape.points[1]);

        this.context.stroke();
        break;
      case ShapeTypes.RECTANGLE:
        const rectangleShape: RectangleShape = shape as RectangleShape;

        const y: number =
          rectangleShape.points[1][0] - rectangleShape.points[0][0];
        const x: number =
          rectangleShape.points[1][1] - rectangleShape.points[0][1];

        this.context.strokeRect(...rectangleShape.points[0], y, x);

        this.context.fillStyle = rectangleShape.background;
        break;
      case ShapeTypes.TRIANGLE:
        const triangleShape: TriangleShape = shape as TriangleShape;

        this.context.moveTo(...triangleShape.points[0]);
        this.context.lineTo(...triangleShape.points[1]);
        this.context.lineTo(...triangleShape.points[2]);
        this.context.lineTo(...triangleShape.points[0]);

        this.context.stroke();
        this.context.fillStyle = triangleShape.background;
        break;
      case ShapeTypes.CIRCLE:
        const circleShape: CircleShape = shape as CircleShape;

        this.context.arc(
          ...circleShape.points[0],
          circleShape.radius,
          0,
          2 * Math.PI,
          false
        );

        this.context.stroke();
        this.context.fillStyle = circleShape.background;
        break;
      case ShapeTypes.ELLIPSE:
        const ellipseShape: EllipseShape = shape as EllipseShape;

        this.context.ellipse(
          ...ellipseShape.points[0],
          ellipseShape.radiusX,
          ellipseShape.radiusY,
          0,
          0,
          2 * Math.PI
        );

        this.context.stroke();
        this.context.fillStyle = ellipseShape.background;
        break;
    }

    this.context.fill();
  }

  public deleteShape(index: number): void {
    this.shapes.splice(index, 1);
    this.redraw();
  }

  public clear(): void {
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }

  public redraw(): void {
    this.clear();

    for (const shape of this.shapes) {
      this.draw(shape);
    }
  }

  public onResize(): void {
    this.clear();
    this.setCanvasSize();
    this.redraw();
  }

  setCanvasSize(
    height: number = this.canvas.nativeElement.offsetHeight,
    width: number = this.canvas.nativeElement.offsetWidth
  ): void {
    this.canvas.nativeElement.height = height;
    this.canvas.nativeElement.width = width;
  }

  public mouseMove(event: MouseEvent): void {
    const x: number = event.pageX - this.canvas.nativeElement.offsetLeft;
    const y: number = event.pageY - this.canvas.nativeElement.offsetTop;
    this.coordinatesCursor = `X: ${x}; Y: ${y}`;
  }
  public mouseLeave(): void {
    this.coordinatesCursor = '';
  }
}
