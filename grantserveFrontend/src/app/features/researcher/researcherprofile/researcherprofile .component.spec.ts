import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResearcherprofileComponent } from './researcherprofile.component';

describe('ResearcherprofileComponent', () => {
  let component: ResearcherprofileComponent;
  let fixture: ComponentFixture<ResearcherprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearcherprofileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ResearcherprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});