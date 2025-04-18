import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../../../../shared/models/IPokemen.model';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpParams } from '@angular/common/http';

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
  // loading = true;
  // total = 1;
  // pageSize = 10;
  // pageIndex = 1;

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
