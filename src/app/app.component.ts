import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}
  ngOnInit(): void {
    this.pokemonService.getPokemonDTOs();
  }
}
