import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonRecordDialogService {
  // For dialog
  private pokemonRecordDialogSubject = new Subject<void>();
  pokemonRecordDialog$ = this.pokemonRecordDialogSubject.asObservable();

  triggerCapturePokemonDialog() {
    this.pokemonRecordDialogSubject.next();
  }
}
