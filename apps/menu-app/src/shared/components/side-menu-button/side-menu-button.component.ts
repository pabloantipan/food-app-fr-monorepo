import { Component } from '@angular/core';
import { SideMenuProvider } from '@providers/side-menu.provider';

@Component({
  selector: 'app-side-menu-button',
  templateUrl: './side-menu-button.component.html',
  styleUrls: ['./side-menu-button.component.scss'],
})
export class SideMenuButtonComponent {

  constructor(
    private readonly sideMenuProvider: SideMenuProvider,
  ) { }

  toggle() {
    this.sideMenuProvider.toggle();
  }
}
