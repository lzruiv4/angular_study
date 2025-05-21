import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../../../models/IPokemen.model';
import { CommonModule } from '@angular/common';
import { PokemonService } from '@/services/Pokemon.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ImageComponent } from '@/shared/base-components/image/image.component';

@Component({
  standalone: true, // After angular 17 can one use this. But module is not used.
  selector: 'app-pokedex',
  imports: [CommonModule, NzTableModule, ImageComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.less',
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
