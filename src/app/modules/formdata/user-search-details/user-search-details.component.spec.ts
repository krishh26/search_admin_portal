import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchDetailsComponent } from './user-search-details.component';

describe('UserSearchDetailsComponent', () => {
  let component: UserSearchDetailsComponent;
  let fixture: ComponentFixture<UserSearchDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSearchDetailsComponent]
    });
    fixture = TestBed.createComponent(UserSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
