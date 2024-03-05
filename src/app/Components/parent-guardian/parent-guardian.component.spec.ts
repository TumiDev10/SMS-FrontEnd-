import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentGuardianComponent } from './parent-guardian.component';

describe('ParentGuardianComponent', () => {
  let component: ParentGuardianComponent;
  let fixture: ComponentFixture<ParentGuardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentGuardianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
