import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveLineComponent } from './move-line.component';

describe('MoveLineComponent', () => {
  let component: MoveLineComponent;
  let fixture: ComponentFixture<MoveLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoveLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
