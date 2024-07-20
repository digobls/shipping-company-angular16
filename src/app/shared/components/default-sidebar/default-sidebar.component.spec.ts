import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultSidebarComponent } from './default-sidebar.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('DefaultSidebarComponent', () => {
  let component: DefaultSidebarComponent;
  let fixture: ComponentFixture<DefaultSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultSidebarComponent ],
      imports: [ RouterTestingModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isExpanded initially true', () => {
    expect(component.isExpanded).toBeTrue();
  });

  it('should toggle isExpanded and emit statusMenu on openAndCloseMenu', () => {
    spyOn(component.statusMenu, 'emit');

    component.openAndCloseMenu();
    expect(component.isExpanded).toBeFalse();
    expect(component.statusMenu.emit).toHaveBeenCalledWith(false);

    component.openAndCloseMenu();
    expect(component.isExpanded).toBeTrue();
    expect(component.statusMenu.emit).toHaveBeenCalledWith(true);
  });

  it('should set showMenu to true on expand', () => {
    component.expand();
    expect(component.showMenu).toBeTrue();
  });

  it('should set showMenu to false on collapse', () => {
    component.collapse();
    expect(component.showMenu).toBeFalse();
  });

  it('should toggle the class "expanded" based on isExpanded and showMenu', () => {
    const navElement = fixture.debugElement.query(By.css('nav.default-sidebar'));

    component.isExpanded = false;
    component.showMenu = false;
    fixture.detectChanges();
    expect(navElement.classes['expanded']).toBeFalsy();

    component.isExpanded = true;
    fixture.detectChanges();
    expect(navElement.classes['expanded']).toBeTruthy();

    component.isExpanded = false;
    component.showMenu = true;
    fixture.detectChanges();
    expect(navElement.classes['expanded']).toBeTruthy();
  });

  it('should call expand on mouseenter and collapse on mouseleave', () => {
    spyOn(component, 'expand');
    spyOn(component, 'collapse');

    const navElement = fixture.debugElement.query(By.css('nav.default-sidebar'));
    navElement.triggerEventHandler('mouseenter', null);
    expect(component.expand).toHaveBeenCalled();

    navElement.triggerEventHandler('mouseleave', null);
    expect(component.collapse).toHaveBeenCalled();
  });

  it('should call openAndCloseMenu on icon click', () => {
    spyOn(component, 'openAndCloseMenu');

    const iconElement = fixture.debugElement.query(By.css('.close-and-open-menu i'));
    iconElement.triggerEventHandler('click', null);
    expect(component.openAndCloseMenu).toHaveBeenCalled();
  });
});
