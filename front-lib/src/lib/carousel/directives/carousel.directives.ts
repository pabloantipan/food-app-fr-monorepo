import {
  AfterContentInit, ContentChildren,
  Directive, ElementRef, Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselProvider } from '../providers/carousel.provider';

@Directive({
  selector: '[libCarouselItem]'
})
export class CarouselItemDirective implements OnInit {
  @Input() visible = false;
  @Input() displayClass = 'grid';

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }

  setVisibility(visible: boolean) {
    this.visible = visible;
    this.act();
  }

  public act() {
    this.renderer.setStyle(this.el.nativeElement, 'display', this.visible ? this.displayClass : 'none');
  }
}

@Directive({
  selector: '[libCarousel]'
})
export class CarouselDirective implements AfterContentInit, OnDestroy, OnChanges {
  @ContentChildren(CarouselItemDirective) carouselItems!: QueryList<CarouselItemDirective>;
  @Input() interval = '3'; // Interval in secs

  private providerSubscription = new Subscription();
  private carouselItemsChangeSubscription = new Subscription();
  private currentIndex = 0;

  constructor(
    private readonly carouselProvider: CarouselProvider,
  ) {
    this.providerSubscription = this.carouselProvider.observeAction().subscribe((action) => {
      switch (action) {
        case 'next':
          this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
          this.carouselProvider.updateIndex(this.currentIndex);
          this.updateCarousel();
          break;
        case 'prev':
          this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
          this.carouselProvider.updateIndex(this.currentIndex);
          this.updateCarousel();
          break;
        case 'pause':
          // this.pause();
          break;
      }
    });
  }

  ngOnChanges() { }

  ngAfterContentInit() {
    if (!this.carouselItems) return;
    this.carouselItemsChangeSubscription = this.carouselItems.changes.subscribe(() => {
      this.carouselProvider.updateItemsQuantity(this.carouselItems.length);
      this.startCarousel();
      this.carouselItems.get(0)?.setVisibility(true);
    });

  }

  ngOnDestroy() {
    this.providerSubscription.unsubscribe();
    this.carouselItemsChangeSubscription.unsubscribe();
  }

  private startCarousel() {
    const intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
      this.updateCarousel();
    }, Number(this.interval) * 1000);
  }

  private updateCarousel() {
    this.carouselItems.forEach((item, index) => {
      item.setVisibility(index === this.currentIndex);
    });
  }
}
