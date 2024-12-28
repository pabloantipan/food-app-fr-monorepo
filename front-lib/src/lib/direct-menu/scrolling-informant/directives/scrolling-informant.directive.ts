import { Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';
import {
  SCROLLING_SETTINGS, WindowScrollingDirection
} from '../constants/scrolling.constant';
import { WindowScrollingInterface } from '../interfaces/scrolling.interfaces';
import { ScrollingInformantProvider } from '../providers/scrolling-informant.provider';

export function getDebounceDelay(): number {
  // if (!environment.platformCompiledFor) { return SCROLLING_DEBOUNCE_DEFAULT_DELAY; }
  // if (!(environment.platformCompiledFor in SCROLLING_SETTINGS)) { return SCROLLING_DEBOUNCE_DEFAULT_DELAY; }
  // return SCROLLING_SETTINGS[environment.platformCompiledFor].debounceDelayMs;
  return SCROLLING_SETTINGS.web.debounceDelayMs;
}

export function debounce(delay?: number): MethodDecorator {
  // source: https://stackoverflow.com/questions/44634992/debounce-hostlistener-event
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    if (!delay) { delay = getDebounceDelay(); }
    const original = descriptor.value;
    const key = `__scrolling_informant_timeout__${String(propertyKey)}`;
    descriptor.value = function (...args: any[]): any {
      clearTimeout((this as any)[key]);
      (this as any)[key] = setTimeout(() => original.apply(this, args), delay);
    };
    return descriptor;
  };
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[scrollingInformant]'
})
export class ScrollingInformantDirective implements OnDestroy {
  private previousScrollTopValue = 0;

  constructor(
    private el: ElementRef,
    private scrollingInformantProvider: ScrollingInformantProvider,
  ) {
    // console.log('scrollingInformantDirective', this.el.nativeElement);
    // console.log('scrollingInformantDirective', this.el.nativeElement.clientHeight);
    // console.log('scrollingInformantDirective', this.el.nativeElement.scrollHeight);
  }

  @HostListener('scroll', ['$event'])
  @debounce()
  onScroll($event: Event): void {
    // console.log($event);
    const element = $event.target as Element;
    const newScrollTopValue = element.scrollTop;

    const newDistanceToBottom = element.scrollHeight - element.clientHeight - newScrollTopValue;
    const newWindowScrollingValues = {
      previousValue: this.previousScrollTopValue,
      actualValue: newScrollTopValue,
      direction: this.getScrollDirection(this.previousScrollTopValue, newScrollTopValue),
      variation: Math.abs(this.previousScrollTopValue - newScrollTopValue),
      distanceToBottom: newDistanceToBottom,
      distanceToTop: newScrollTopValue,
      isAtBottom: newDistanceToBottom < this.distantToBottomLimint,
      isAtTop: newScrollTopValue < this.distantToTopLimit,
    } as WindowScrollingInterface;


    this.scrollingInformantProvider.updateScrollY(newWindowScrollingValues);
    this.previousScrollTopValue = newScrollTopValue;
  }

  private get distantToBottomLimint(): number {
    return SCROLLING_SETTINGS.web.downDirectionThresholdPx;
    // return SCROLLING_SETTINGS[this.util.platformCompiledFor].downDirectionThresholdPx;

  }

  private get distantToTopLimit(): number {
    // return SCROLLING_SETTINGS[this.util.platformCompiledFor].upDirectionThresholdPx;
    return SCROLLING_SETTINGS.web.upDirectionThresholdPx;
  }

  private getScrollDirection(previousValue: number, actualValue: number): WindowScrollingDirection {
    if (previousValue < actualValue) { return 'down'; }
    if (previousValue > actualValue) { return 'up'; }
    return 'none';
  }

  ngOnDestroy(): void {
    console.log('scrollingInformantDirective ngOnDestroy');
  }

  public get platformCompiledFor(): string {
    // if (environment.platformCompiledFor) { return environment.platformCompiledFor; }
    return 'web';
  }
}
