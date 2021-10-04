import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoNgComponent } from './demo-ng.component';

describe('DemoNgComponent', () => {
  let component: DemoNgComponent;
  let fixture: ComponentFixture<DemoNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoNgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
