import { Routes } from '@angular/router';
import { PokedexComponent } from './features/pokemon_game/components/pokedex/pokedex.component';
import { HomeComponent } from './layout/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pokedex', component: PokedexComponent },
];
