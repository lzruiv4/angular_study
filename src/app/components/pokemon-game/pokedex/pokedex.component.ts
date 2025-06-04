import { Component, OnInit } from '@angular/core';
import { IPokemonWithNameAndFotos } from '../../../models/IPokemen.model';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ImageComponent } from '@/shared/base-components/image/image.component';
import { PokemonService } from '@/services/pokemon.service';

@Component({
  standalone: true, // After angular 17 can one use this. And module is not used.
  selector: 'app-pokedex',
  imports: [CommonModule, NzTableModule, ImageComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.less',
})
export class PokedexComponent implements OnInit {
  pokemons: IPokemonWithNameAndFotos[] = [];

  selectedPokemon: IPokemonWithNameAndFotos = {
    id: '',
    name: '',
    image: '',
    biggerImage: '',
  };

  selectPokemon(pokemon: IPokemonWithNameAndFotos): void {
    this.selectedPokemon = pokemon;
  }

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonDTOs().subscribe();
    this.pokemonService.pokemons$.subscribe((data) => (this.pokemons = data));
  }
}
