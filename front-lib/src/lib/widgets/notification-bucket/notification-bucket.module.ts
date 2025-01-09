import { NgModule, Optional, SkipSelf } from "@angular/core";
import { NotificationBucketProvider } from "./providers/notification-bucket.provider";

@NgModule({
  declarations: [
    // NotificationBucketComponent,
  ],
  imports: [
    // CommonModule,
  ],
  providers: [
    NotificationBucketProvider,
  ],
  exports: [
    // NotificationBucketComponent,
  ],
})
export class NotificationBucketModule {
  constructor(
    @Optional() @SkipSelf() parentModule: NotificationBucketModule
  ) {
    console.log('NotificationBucketModule');
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
