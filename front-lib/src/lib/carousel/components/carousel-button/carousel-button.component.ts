import { Component, Input } from '@angular/core';
import { CarouselProvider } from '../../providers/carousel.provider';

@Component({
  selector: 'lib-carousel-button',
  templateUrl: './carousel-button.component.html',
  styleUrls: ['./carousel-button.component.scss']
})
export class CarouselButtonComponent {
  @Input() direction: 'prev' | 'next' = 'next';
  @Input() content = false;

  constructor(
    private readonly carouselProvider: CarouselProvider,
  ) { }

  onClick() {
    this.carouselProvider.sendAction(this.direction);
  }
}
