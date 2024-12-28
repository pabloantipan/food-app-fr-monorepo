import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollingInformantDirective } from './directives/scrolling-informant.directive';
import { ScrollingInformantProvider } from './providers/scrolling-informant.provider';

@NgModule({
  // There should be no declarations in a module that is not meant to be used as a feature module.
  // declarations: [],
  // There should be no imports in a module that is not meant to be used as a feature module.
  imports: [
    CommonModule,
  ],
  declarations: [
    ScrollingInformantDirective,
  ],
  providers: [
    {
      provide: ScrollingInformantProvider,
      useFactory: () => new ScrollingInformantProvider(),
    },
    // ScrollingInformantProvider,
  ],
  exports: [
    ScrollingInformantDirective,
  ],
})
export class ScrollingInformantModule { }
