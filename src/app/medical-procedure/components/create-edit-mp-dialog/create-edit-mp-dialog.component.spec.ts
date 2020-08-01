import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditMpDialogComponent } from './create-edit-mp-dialog.component';

describe('CreateEditMpDialogComponent', () => {
  let component: CreateEditMpDialogComponent;
  let fixture: ComponentFixture<CreateEditMpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditMpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditMpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
