import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDialogComponent } from './lead-dialog.component';

describe('LeadDialogComponent', () => {
  let component: LeadDialogComponent;
  let fixture: ComponentFixture<LeadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadDialogComponent]
    });
    fixture = TestBed.createComponent(LeadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
