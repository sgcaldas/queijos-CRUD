import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheesesComponent } from './cheeses.component';

describe('CheesesComponent', () => {
  let component: CheesesComponent;
  let fixture: ComponentFixture<CheesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheesesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
