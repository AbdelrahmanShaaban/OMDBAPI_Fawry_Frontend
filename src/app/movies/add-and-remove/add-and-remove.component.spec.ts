import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndRemoveComponent } from './add-and-remove.component';

describe('AddAndRemoveComponent', () => {
  let component: AddAndRemoveComponent;
  let fixture: ComponentFixture<AddAndRemoveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAndRemoveComponent]
    });
    fixture = TestBed.createComponent(AddAndRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
