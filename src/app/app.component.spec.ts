import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule} from './shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [SharedModule],
      providers: [ { provide: ActivatedRoute, useValue: {} } ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain <app-default-navbar> element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-default-navbar')).not.toBeNull();
  });

  it('should contain <router-outlet> element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should toggle menuIsOpen when checkStatusMenu is called', () => {
    component.checkStatusMenu(false);
    expect(component.menuIsOpen).toBeFalse();

    component.checkStatusMenu(true);
    expect(component.menuIsOpen).toBeTrue();
  });

  it('should have "menu-open" class when menuIsOpen is true', () => {
    component.menuIsOpen = true;
    fixture.detectChanges();
    const containerData = fixture.debugElement.query(By.css('.container-data'));
    expect(containerData.classes['menu-open']).toBeTrue();
    expect(containerData.classes['menu-close']).toBeFalsy();
  });

  it('should have "menu-close" class when menuIsOpen is false', () => {
    component.menuIsOpen = false;
    fixture.detectChanges();
    const containerData = fixture.debugElement.query(By.css('.container-data'));
    expect(containerData.classes['menu-close']).toBeTrue();
    expect(containerData.classes['menu-open']).toBeFalsy();
  });

  it('should call checkStatusMenu when statusMenu event is emitted', () => {
    spyOn(component, 'checkStatusMenu');
    const sidebar = fixture.debugElement.query(By.css('app-default-sidebar'));
    sidebar.triggerEventHandler('statusMenu', false);
    expect(component.checkStatusMenu).toHaveBeenCalledWith(false);
  });
});
