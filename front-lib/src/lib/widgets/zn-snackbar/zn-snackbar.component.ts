import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ZnSnackbarProvider } from '@shared/providers/zn-snackbar.provider';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'zn-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './zn-snackbar.component.html',
  styleUrl: './zn-snackbar.component.scss'
})
export class SnackbarComponent implements OnInit {
  message = `I'm a snackbar`;

  constructor(
    private znSnackbarProvider: ZnSnackbarProvider
  ) { }

  async ngOnInit() { }

  private selfDestruct(timeSec = 1) {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, timeSec * timeSec * 1000);
    })

  }

}
