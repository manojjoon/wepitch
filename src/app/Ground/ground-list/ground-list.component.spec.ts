import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundListComponent } from './ground-list.component';

describe('GroundListComponent', () => {
  let component: GroundListComponent;
  let fixture: ComponentFixture<GroundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
