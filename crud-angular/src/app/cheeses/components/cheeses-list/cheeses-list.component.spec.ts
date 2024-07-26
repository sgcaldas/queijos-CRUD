import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheesesListComponent } from './cheeses-list.component';

describe('CheesesListComponent', () => {
  let component: CheesesListComponent;
  let fixture: ComponentFixture<CheesesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheesesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheesesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
