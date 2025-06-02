import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E2eQaSeviceComponent } from './e2e-qa-sevice.component';

describe('E2eQaSeviceComponent', () => {
  let component: E2eQaSeviceComponent;
  let fixture: ComponentFixture<E2eQaSeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [E2eQaSeviceComponent]
    });
    fixture = TestBed.createComponent(E2eQaSeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
