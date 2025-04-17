import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { PokemonsComponent } from './features/pokemon_game/components/pokemons/pokemons.component';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, NzButtonModule, LayoutComponent],
  imports: [LayoutComponent, PokemonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular_first';
}
