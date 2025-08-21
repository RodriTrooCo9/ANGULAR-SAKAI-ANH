import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [ButtonModule, RippleModule, RouterModule, AppFloatingConfigurator, ButtonModule],
  templateUrl: './error.html',
  styleUrl: './error.scss'
})
export class Error {

}
