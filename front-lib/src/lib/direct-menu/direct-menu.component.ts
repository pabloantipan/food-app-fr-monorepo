import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SCROLLING_SETTINGS } from '@shared/scrolling-informant/constants/scrolling.constant';
import { WindowScrollingInterface } from '@shared/scrolling-informant/interfaces/scrolling.interfaces';
import { ScrollingInformantModule, ScrollingInformantProvider } from '@ui/';
import { filter } from 'rxjs';

const URLS_WITHOUT_DIRECT_MOBILE_MENU = [
  '/welcome/start',
  '/login/sign-in',
  '/login/sign-up.*',
];

@Component({
  selector: 'app-direct-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ScrollingInformantModule,
  ],
  providers: [
    // ScrollingInformantProvider,
  ],
  templateUrl: './direct-menu.component.html',
  styleUrls: ['./direct-menu.component.scss'],
})

export class DirectMenuComponent implements OnInit {
  public showMenu = false;

  public isHomeSelected = true;
  public isFinanceSelected = false;
  public isCalendarSelected = false;
  public isSecuritySelected = false;
  public isProfileSelected = false;

  @HostBinding('class.fading') isFaded: boolean | undefined;
  @HostBinding('class.entering') isEntering: boolean | undefined;

  private subscription: any;

  constructor(
    private router: Router,
    private scrollingProvider: ScrollingInformantProvider,
  ) {
    //this.scrollingProviderSubscription();
  }

  ngOnInit(): void {

  }

  private showMenuSubscription(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        // this.showMenu = !URLS_WITHOUT_DIRECT_MOBILE_MENU.includes((event as NavigationEnd).url);
        this.showMenu = !this.validatePath((event as NavigationEnd).url, URLS_WITHOUT_DIRECT_MOBILE_MENU);
      });
  }

  private scrollingProviderSubscription(): void {
    this.subscription = this.scrollingProvider.observeVerticalScroll()
      .subscribe({
        next: (windowScrollingData: WindowScrollingInterface) => {
          // console.log('windowScrollingData:', windowScrollingData);
          const { direction, variation, isAtTop, isAtBottom } = windowScrollingData;
          if (direction === 'down' &&
            (variation > this.downDirectionThresholdPx || (isAtTop && isAtBottom))) {
            this.isFaded = true;
            this.isEntering = false;
          }
          if (direction === 'up' &&
            (variation > this.upDirectionThresholdPx || (isAtTop && isAtBottom))) {
            this.isFaded = false;
            this.isEntering = true;
          }
        },
        error: (error: any) => console.error('scrollingProviderSubscription error:', error),
        complete: () => console.log('scrollingProviderSubscription complete'),
      });
  }

  private get downDirectionThresholdPx(): number {
    return SCROLLING_SETTINGS.web.downDirectionThresholdPx;
  }

  private get upDirectionThresholdPx(): number {
    return SCROLLING_SETTINGS.web.upDirectionThresholdPx;
  }


  public goTo(route: string): void {
    this.router.navigate([route]);
  }

  public goToHome(): void {
    // this.goTo();
    this.resetSelected();
    this.isHomeSelected = true;
    this.router.navigate(['/amenities'])
      .catch((error) => console.error('goToAmenities error:', error));
  }

  public goToStart(): void {
    // this.goTo();
    this.resetSelected();
    this.isFinanceSelected = true;
    this.router.navigate(['/financial/financial-management'])
    .catch((error) => console.error('goToAmenities error:', error));
  }

  public goToCalendar(): void {
    // this.goTo();
    this.router.navigate(['/reservation-day/reservation-day-main'])
    .catch((error) => console.error('goToAmenities error:', error));
    

    this.resetSelected();
    this.isCalendarSelected = true;
  }

  public goToSecurity(): void {
    // this.goTo();
    this.router.navigate(['/incident/create-incident-report'])
    .catch((error) => console.error('goToAmenities error:', error));
    
    this.resetSelected();
    this.isSecuritySelected = true;
  }

  public goToProfile(): void {
    // this.goTo();
    this.router.navigate(['/profile/my-profile'])
    .catch((error) => console.error('goToAmenities error:', error));
    
    this.resetSelected();
    this.isProfileSelected = true;
  }

  public resetSelected(): void {
    this.isHomeSelected = false;
    this.isFinanceSelected = false;
    this.isCalendarSelected = false;
    this.isSecuritySelected = false;
    this.isProfileSelected = false;
  }

  public canShowTheMenu(): boolean {
    // user different to employer show menu.
    // if (URLS_WITHOUT_DIRECT_MOBILE_MENU.includes(this.router.url)) return false;
    return true;
  }

  private validatePath(path: string, urls: string[]): boolean {
    const regex = new RegExp(`^(${urls.join('|')})$`);
    return regex.test(path);
  }
}
