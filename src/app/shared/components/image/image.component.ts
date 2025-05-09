import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.component.html',
})
export class ImageComponent {
  @Input() imagePath!: string;
  @Input() imageSize?: string;
}
