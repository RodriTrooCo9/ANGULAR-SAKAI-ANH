import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterModule, AppFloatingConfigurator, ButtonModule],
  templateUrl: './notfound.html',
  styleUrl: './notfound.scss'
})
export class Notfound {

}
