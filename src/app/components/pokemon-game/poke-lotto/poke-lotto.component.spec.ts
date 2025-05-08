import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeLottoComponent } from './poke-lotto.component';

describe('PokeLottoComponent', () => {
  let component: PokeLottoComponent;
  let fixture: ComponentFixture<PokeLottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeLottoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokeLottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
