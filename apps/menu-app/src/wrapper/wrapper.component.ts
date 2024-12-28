import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '@components/main-layout/main-layout.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MainLayoutComponent,
  ],
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {
  constructor() { }
}
