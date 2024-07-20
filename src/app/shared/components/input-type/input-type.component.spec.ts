import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTypeComponent } from './input-type.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

describe('InputTypeComponent', () => {
  let component: InputTypeComponent;
  let fixture: ComponentFixture<InputTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTypeComponent ],
      imports: [ ReactiveFormsModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTypeComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      testInput: new FormControl('')
    });
    component.id = 'testInput';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label if showLabel is true', () => {
    component.label = 'Test Label';
    component.showLabel = true;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should not display label if showLabel is false', () => {
    component.showLabel = false;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement).toBeNull();
  });

  it('should display required asterisk if isRequired and showRequiredLabel are true', () => {
    component.isRequired = true;
    component.showRequiredLabel = true;
    fixture.detectChanges();

    const asteriskElement = fixture.nativeElement.querySelector('.required-alert');
    expect(asteriskElement).toBeTruthy();
  });
});
