import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../../../../shared/models/IPokemen.model';
import { CommonModule } from '@angular/common';
import { PokemonService } from '@/features/pokemon_game/services/Pokemon.service';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  standalone: true, // After angular 17 can one use this. But module is not used.
  selector: 'app-pokedex',
  imports: [CommonModule, NzTableModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent implements OnInit {
  pokemons: IPokemon[] = [];

  selectedPokemon: IPokemon = {
    id: '',
    name: '',
    image: '',
    biggerImage: '',
  };

  selectPokemon(pokemon: IPokemon): void {
    this.selectedPokemon = pokemon;
    // console.log(this.selectedPokemon);
  }

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonDTOs().subscribe();
    this.pokemonService.pokemons$.subscribe((data) => (this.pokemons = data));
  }
}
