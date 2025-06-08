import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PokemonRecordService } from '../../../services/pokemon-record.service';
import { filter, switchMap, take } from 'rxjs';
import { UserService } from '@/services/user.service';
import { PokemonRecordDialogService } from '@/services/pokemon-record-dialog.service';

@Component({
  selector: 'app-catch-new-pokemon',
  imports: [NzModalModule, FormsModule, NzSelectModule],
  templateUrl: './catch-new-pokemon.component.html',
  styleUrl: './catch-new-pokemon.component.less',
})
export class CatchNewPokemonComponent implements OnInit {
  isDialogVisible = false;
  isOkLoading = false;

  get user$() {
    return this.userService.user$;
  }

  constructor(
    private pokemonRecordService: PokemonRecordService,
    private pokemonRecordDialogService: PokemonRecordDialogService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user!.pokemonCoin > 0) {
        this.pokemonRecordDialogService.pokemonRecordDialog$.subscribe(() => {
          this.isDialogVisible = true;
        });
      }
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.user$
        .pipe(
          take(1),
          filter((user) => !!user),
          switchMap((user) => {
            return this.userService.updateUser({
              ...user,
              pokemonCoin: user.pokemonCoin - 1,
            });
          }),
        )
        .subscribe();
      this.pokemonRecordService.captureNewPokemon().subscribe();
      this.isDialogVisible = false;
      this.isOkLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isDialogVisible = false;
  }
}
