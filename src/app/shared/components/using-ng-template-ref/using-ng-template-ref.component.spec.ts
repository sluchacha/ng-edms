import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingNgTemplateRefComponent } from './using-ng-template-ref.component';

describe('UsingNgTemplateRefComponent', () => {
  let component: UsingNgTemplateRefComponent;
  let fixture: ComponentFixture<UsingNgTemplateRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsingNgTemplateRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsingNgTemplateRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
