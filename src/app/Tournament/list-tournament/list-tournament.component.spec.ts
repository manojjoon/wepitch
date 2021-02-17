import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTournamentComponent } from './list-tournament.component';

describe('ListTournamentComponent', () => {
  let component: ListTournamentComponent;
  let fixture: ComponentFixture<ListTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
