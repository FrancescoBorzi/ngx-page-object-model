import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';

@Component({
  imports: [RouterModule, CounterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
