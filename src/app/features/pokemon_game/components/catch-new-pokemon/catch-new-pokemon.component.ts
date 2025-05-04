import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PokemonRecordService } from '../../services/pokemon-record.service';
import { UserService } from '../../../user/service/user.service';
import { filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-catch-new-pokemon',
  imports: [NzModalModule, FormsModule, NzSelectModule],
  templateUrl: './catch-new-pokemon.component.html',
  styleUrl: './catch-new-pokemon.component.css',
})
export class CatchNewPokemonComponent implements OnInit {
  isDialogVisible = false;

  get user$() {
    return this.userService.user$;
  }

  constructor(
    private pokemonRecordService: PokemonRecordService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((user) => {
      if (user.pokemonCoin > 0) {
        this.pokemonRecordService.showDialog$.subscribe(() => {
          this.isDialogVisible = true;
        });
      }
    });
  }

  handleOk(): void {
    this.user$
      .pipe(
        take(1),
        filter((user) => !!user),
        switchMap((user) => {
          return this.userService.updateUser({
            ...user,
            pokemonCoin: user.pokemonCoin - 1,
          });
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Update successful:', response);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          alert('An error occurred while updating the user.');
        },
      });

    this.pokemonRecordService.captureNewPokemon().subscribe({
      next: (response) => {
        console.log('Captured successful:', response);
      },
      error: (error) => {
        console.error('Error during capturing :', error);
        alert('An error occurred while capturing a new pokemon.');
      },
    });
    this.isDialogVisible = false;
  }

  handleCancel(): void {
    this.isDialogVisible = false;
  }
}
