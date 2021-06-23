import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoubelleComponent } from './poubelle.component';

describe('PoubelleComponent', () => {
  let component: PoubelleComponent;
  let fixture: ComponentFixture<PoubelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoubelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoubelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
