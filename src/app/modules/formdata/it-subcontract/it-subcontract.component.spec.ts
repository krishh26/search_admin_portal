import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItSubcontractComponent } from './it-subcontract.component';

describe('ItSubcontractComponent', () => {
  let component: ItSubcontractComponent;
  let fixture: ComponentFixture<ItSubcontractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItSubcontractComponent]
    });
    fixture = TestBed.createComponent(ItSubcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
