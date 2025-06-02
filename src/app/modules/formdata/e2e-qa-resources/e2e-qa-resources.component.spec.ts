import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E2eQaResourcesComponent } from './e2e-qa-resources.component';

describe('E2eQaResourcesComponent', () => {
  let component: E2eQaResourcesComponent;
  let fixture: ComponentFixture<E2eQaResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [E2eQaResourcesComponent]
    });
    fixture = TestBed.createComponent(E2eQaResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
