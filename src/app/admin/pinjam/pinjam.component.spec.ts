import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinjamComponent } from './pinjam.component';

describe('PinjamComponent', () => {
  let component: PinjamComponent;
  let fixture: ComponentFixture<PinjamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinjamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinjamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
