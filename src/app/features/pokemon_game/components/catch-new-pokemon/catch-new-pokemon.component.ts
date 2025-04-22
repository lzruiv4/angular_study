import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PokemonRecordService } from '../../services/pokemon-record.service';
import { UserService } from '../../../user/service/user.service';
import { IUser } from '../../../../shared/models/IUser.model';

@Component({
  selector: 'app-catch-new-pokemon',
  imports: [NzModalModule, FormsModule, NzSelectModule],
  templateUrl: './catch-new-pokemon.component.html',
  styleUrl: './catch-new-pokemon.component.css',
})
export class CatchNewPokemonComponent implements OnInit {
  isDialogVisible = false;

  user: IUser = {
    id: '',
    firstname: '',
    lastname: '',
    poke_coin: 0,
  };

  constructor(
    private pokemonRecordService: PokemonRecordService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.pokemonRecordService.showDialog$.subscribe(() => {
      this.isDialogVisible = true;
    });
    this.userService.getUserInfo().subscribe((user) => {
      this.user = user;
    });
  }

  handleOk(): void {
    const newUser = {
      id: this.user.id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      poke_coin: this.user.poke_coin - 1,
    };
    this.userService.updateUser(newUser).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        this.user = response;
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
