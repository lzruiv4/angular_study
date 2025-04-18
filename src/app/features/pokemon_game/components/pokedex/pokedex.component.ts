import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../../../../shared/models/IPokemen.model';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
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

  pokemonsInList: IPokemon[] = [];

  constructor(private pokemonService: PokemonService) {}
  ngOnInit(): void {
    this.pokemonService.getPokemonDTOs().subscribe((data) => {
      this.pokemons = data;
    });
  }
  onCurrentPageDataChange(data: readonly IPokemon[]) {
    this.pokemonsInList = [...data];
  }
}
function createSelector(selectAllPokemons: any, selectRouteQueryName: any, arg2: (pokemons: any, name: any) => any) {
  throw new Error('Function not implemented.');
}

