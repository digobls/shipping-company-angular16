import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonLoadingComponent } from './skeleton-loading.component';

describe('SkeletonLoadingComponent', () => {
  let component: SkeletonLoadingComponent;
  let fixture: ComponentFixture<SkeletonLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonLoadingComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply correct styles based on inputs', () => {
    component.width = '50px';
    component.height = '50px';
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.loading-on-element-custom');
    expect(loadingElement.style.width).toBe('50px');
    expect(loadingElement.style.height).toBe('50px');
  });

  it('should create repeat array based on totalRepeat input', () => {
    component.totalRepeat = 5;
    component.ngOnInit();
    expect(component.repeatArray.length).toBe(5);
  });
});
