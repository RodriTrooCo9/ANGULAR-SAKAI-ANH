import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [ButtonModule, RouterModule, RippleModule, AppFloatingConfigurator, ButtonModule],
  templateUrl: './access.html',
  styleUrl: './access.scss'
})
export class Access {

}
