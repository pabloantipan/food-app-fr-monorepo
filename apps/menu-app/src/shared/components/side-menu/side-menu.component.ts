import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
// import { version } from '@package';
import { SideMenuProvider } from '@providers/side-menu/side-menu.provider';
import { Subscription } from 'rxjs';
// import { version } from '../../../../../../package.json';


@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    // CapitalizeFirstLetterPipe,
    CommonModule,
  ],
  providers: [
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }), // Initial styles
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })) // Animation to final styles
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })) // Animation on leaving
      ])
    ])
  ]
})
export class SideMenuComponent implements OnInit, OnDestroy {
  version = "1.0.0"// version;
  sessionSubscription: Subscription | undefined;
  sideMenuSubscription: Subscription | undefined;
  isSideMenuOpen = true;
  userDetails: any;

  userData = {
    names: 'John Doe',
    email: 'john@doe.com',
  }

  constructor(
    private readonly sideMenuProvider: SideMenuProvider,
    // private readonly sessionProvider: SessionProvider,
  ) { }

  ngOnInit() {
    this.sideMenuSubscription = this.sideMenuProvider.observeIsOpen()
      .subscribe(isOpen => {
        console.log('toggle side menu', isOpen);
        this.isSideMenuOpen = isOpen;
      });
  }

  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  closeMenu() {
    this.sideMenuProvider.close();
  }


}
