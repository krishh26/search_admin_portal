import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItSubcontractDeckComponent } from './it-subcontract-deck.component';

describe('ItSubcontractDeckComponent', () => {
  let component: ItSubcontractDeckComponent;
  let fixture: ComponentFixture<ItSubcontractDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItSubcontractDeckComponent]
    });
    fixture = TestBed.createComponent(ItSubcontractDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
