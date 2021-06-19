import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinjamDetailComponent } from './pinjam-detail.component';

describe('PinjamDetailComponent', () => {
  let component: PinjamDetailComponent;
  let fixture: ComponentFixture<PinjamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinjamDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinjamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
