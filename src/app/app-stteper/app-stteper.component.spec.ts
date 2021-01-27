import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStteperComponent } from './app-stteper.component';

describe('AppStteperComponent', () => {
  let component: AppStteperComponent;
  let fixture: ComponentFixture<AppStteperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStteperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStteperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
