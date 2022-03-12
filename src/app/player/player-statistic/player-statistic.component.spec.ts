import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStatisticComponent } from './player-statistic.component';

describe('PlayerStatisticComponent', () => {
  let component: PlayerStatisticComponent;
  let fixture: ComponentFixture<PlayerStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
