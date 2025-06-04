import { Routes } from '@angular/router';
import { PokedexComponent } from './components/pokemon-game/pokedex/pokedex.component';
import { HomeComponent } from './components/home/home.component';
import { PokeLottoComponent } from './components/pokemon-game/poke-lotto/poke-lotto.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'register', component: RegisterComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'pokedex', component: PokedexComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'poke-lotto',
  //   component: PokeLottoComponent,
  //   canActivate: [AuthGuard],
  // },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'pokedex',
        component: PokedexComponent,
      },
      {
        path: 'pokeLotto',
        component: PokeLottoComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
];
