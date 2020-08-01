import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMpDialogComponent } from './new-mp-dialog.component';

describe('NewMpDialogComponent', () => {
  let component: NewMpDialogComponent;
  let fixture: ComponentFixture<NewMpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
