import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselButtonComponent } from './components/carousel-button/carousel-button.component';
import { CarouselDirective, CarouselItemDirective } from './directives/carousel.directives';
import { CarouselProvider } from './providers/carousel.provider';

@NgModule({
  declarations: [
    // CarouselDirective,
    // CarouselItemDirective,
    // CarouselButtonComponent,
  ],
  imports: [
    CommonModule,
    CarouselDirective,
    CarouselItemDirective,
    CarouselButtonComponent,
  ],
  providers: [
    {
      provide: CarouselProvider,
      useFactory: () => new CarouselProvider(),
    },
    // CarouselProvider,
  ],
  exports: [
    CarouselDirective,
    CarouselItemDirective,
    CarouselButtonComponent,
  ],
})
export class CarouselModule { }
