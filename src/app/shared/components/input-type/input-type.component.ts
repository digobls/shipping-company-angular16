import { FormGroup } from '@angular/forms';
import { Component, Input, ElementRef, HostListener, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-type',
  templateUrl: 'input-type.component.html',
  styleUrls: ['./input-type.component.scss'],
})

export class InputTypeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() formGroup!: FormGroup;
  private subscription!: Subscription;

  // Label
  @Input() label: string = '';
  @Input() showLabel: boolean = true;
  @Input() showRequiredLabel: boolean = false;
  @Input() isRequired: boolean = false;

  // Input
  @Input() type: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() disabled: boolean = false;

  // Invalid message
  @Input() customRequiredMsg: string = '';
  @Input() invalidMsg: string = 'Campo obrigatório!';

  // Config Select, Dropdown, Dropdown Multiple
  dropdownOpen: boolean = false;
  fromRemove: boolean = false;
  valueDropSelected: any = null;
  valueSearchDrop: string = '';

  @Input() bindLabel: string = '';
  @Input() bindValue: string = '';
  @Input() listDrop: any = [];
  @Input() multiple: boolean = false;
  @Input() loadingData: boolean = false;
  @Input() searchSelect: boolean = true;
  @Input() iconDrop: string = 'ri-arrow-drop-down-line';
  @Input() placeHolderSearchSelect: string = 'Pesquisar';
  @Input() txtSearchEmpty: string = 'Nenhum resultado encontrado'

  // Global
  @Input() iconRemove: string = 'ri-close-line';

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {

  }

  ngOnChanges(changes: any): void {
    // Config from select, dropdown, drop multiple
    if (this.type === 'select' && this.control.value && (changes?.listDrop?.currentValue !== changes?.listDrop?.previousValue)) {
      if (this.multiple) {
        this.valueDropSelected = this.control.value;
      } else {
        this.rulesPatchValueDropdown(changes?.listDrop?.currentValue);
      }
    }

    // On change multiple or single item from select
    if (this.type === 'select' && !this.disabled) {
      if (changes?.multiple?.currentValue && typeof changes?.disabled?.previousValue === 'boolean') {
        this.valueDropSelected = [];
      } else if (!changes?.multiple?.currentValue && typeof changes?.disabled?.previousValue === 'boolean') {
        this.valueDropSelected = null;
      }
    }

    // Patch form value
    if ((this.type === 'select' && !this.valueDropSelected) || (this.type === 'tag' && !this.valueDropSelected) || this.type === 'checkbox') {
      if (changes?.formGroup?.currentValue) {
        const subscription = this.formGroup.valueChanges.subscribe(() => {
          switch (this.type) {
                   case 'select':
              if (this.multiple) {
                this.valueDropSelected = changes?.formGroup?.currentValue?.controls[this.id]?.value || null;
                if (this.valueDropSelected?.length) {
                  subscription?.unsubscribe();
                }
              } else {
                this.rulesPatchValueDropdown(this.listDrop, subscription);
              }
              break;
          }
        });
      }
    }
 }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // On patch values from select, dropdown
  rulesPatchValueDropdown(currentValue: any, subscription?: Subscription) {
    if (currentValue.length) {
      currentValue.forEach((value: any) => {
        if (value === this.control.value || value[this.bindValue] === this.control.value || JSON.stringify(value) === JSON.stringify(this.control.value)) {
          this.valueDropSelected = value;
          subscription?.unsubscribe();
        }
      });
    }
  }

  // Get data control
  get control() {
    return this.formGroup!.controls[this.id];
  }

  // --------- Start configs dropdown drop multiple ---------

  // Open dropdown
  toggleDropdown() {
    setTimeout(() => {
      if (!this.disabled && !this.fromRemove) {
        this.dropdownOpen = !this.dropdownOpen;

        setTimeout(() => {
          if (this.dropdownOpen) {
            const searchDropInput = document.getElementById('searchDrop');
            if (searchDropInput) {
              searchDropInput.focus();
            }
          }
        }, 100);
      }
    }, 100);
  }

  // On focus button select
  onFocusTouchedDirty() {
    this.control?.markAsTouched();
    this.control?.markAsDirty();
  }

  // Set data value
  selectOption(value: any) {
    if (value !== 'isEmptySearch') {
      if (this.multiple) {
        if (this.valueDropSelected === null || (this.multiple && typeof this.valueDropSelected === 'string')) {
          this.valueDropSelected = [];
        }

        const exists = this.checkValueExists(value);
        if (!exists) {
          this.valueDropSelected.push(value);
          this.formGroup.get(this.id)?.setValue(this.valueDropSelected);
        }
      } else {
        if (this.bindValue) {
          this.formGroup.get(this.id)?.setValue(value[this.bindValue]);
        } else {
          this.formGroup.get(this.id)?.setValue(value);
        }

        this.valueDropSelected = value;
      }

      this.valueSearchDrop = '';
      this.dropdownOpen = false;
    }
  }

  // Check value exist to push on array
  checkValueExists(value: any): boolean {
    if (this.valueDropSelected?.length) {
      return this.valueDropSelected.some((item: any) => {
        return JSON.stringify(item) === JSON.stringify(value);
      });
    } else {
      return false;
    }
  }

  // Remove value selected from multiple
  removeValueMultiple(index: number) {
    this.fromRemove = true;
    this.dropdownOpen = false;
    this.valueDropSelected.splice(index, 1);
    this.formGroup.get(this.id)?.setValue(this.valueDropSelected);

    setTimeout(() => {
      this.fromRemove = false;
    }, 300);
  }

  // Remove all values
  removeDropValue() {
    if (!this.disabled) {
      if (this.multiple) {
        this.valueDropSelected = [];
      } else {
        this.valueDropSelected = null;
      }

      this.formGroup.get(this.id)?.setValue(this.valueDropSelected);
    }
  }

  // Close on click off
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
