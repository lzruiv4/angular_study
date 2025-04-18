import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { PokedexComponent } from './features/pokemon_game/components/pokedex/pokedex.component';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, NzButtonModule, LayoutComponent],
  imports: [LayoutComponent, PokedexComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular_first';
}
