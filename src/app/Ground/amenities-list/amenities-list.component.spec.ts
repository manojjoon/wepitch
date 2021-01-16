import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { amenitiesListComponent } from './amenities-list.component';

describe('AmenitiesListComponent', () => {
  let component: amenitiesListComponent;
  let fixture: ComponentFixture<amenitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ amenitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(amenitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
