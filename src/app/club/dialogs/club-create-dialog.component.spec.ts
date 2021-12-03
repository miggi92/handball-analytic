import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubCreateDialogComponent } from './club-create-dialog.component';

describe('ClubCreateDialogComponent', () => {
  let component: ClubCreateDialogComponent;
  let fixture: ComponentFixture<ClubCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
