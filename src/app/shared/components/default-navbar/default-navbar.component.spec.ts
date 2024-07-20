import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultNavbarComponent } from './default-navbar.component';

describe('DefaultNavbarComponent', () => {
  let component: DefaultNavbarComponent;
  let fixture: ComponentFixture<DefaultNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultNavbarComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct name in the navbar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container-name span').textContent).toContain('Rodrigo Pereira');
  });

  it('should display the correct initials in the avatar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.rounded-name span').textContent).toBe('RP');
  });
});
