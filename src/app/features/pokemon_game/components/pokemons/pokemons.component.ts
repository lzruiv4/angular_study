import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../../../../shared/models/IPokemen.model';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  standalone: true, // After angular 17 can one use this. But module is not used.
  selector: 'app-pokemons',
  imports: [CommonModule],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
})
export class PokemonsComponent implements OnInit {
  pokemons: IPokemon[] = [];
  constructor(private pokemonService: PokemonService) {}
  ngOnInit(): void {
    this.pokemonService.getPokemonDTOs().subscribe((data) => {
      this.pokemons = data;
    });
  }
}
