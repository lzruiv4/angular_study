import { Routes } from '@angular/router';
import { PokedexComponent } from './components/pokemon-game/pokedex/pokedex.component';
import { HomeComponent } from './layout/home/home.component';
import { PokeLottoComponent } from './components/pokemon-game/poke-lotto/poke-lotto.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'pokedex', component: PokedexComponent, canActivate: [AuthGuard] },
  {
    path: 'poke-lotto',
    component: PokeLottoComponent,
    canActivate: [AuthGuard],
  },
];
