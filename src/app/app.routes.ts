import { Routes } from '@angular/router';
import { PokedexComponent } from './components/pokemon-game/pokedex/pokedex.component';
import { HomeComponent } from './layout/home/home.component';
import { PokeLottoComponent } from './components/pokemon-game/poke-lotto/poke-lotto.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'poke-lotto', component: PokeLottoComponent },
];
