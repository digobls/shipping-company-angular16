import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-default-sidebar',
  templateUrl: './default-sidebar.component.html',
  styleUrls: ['./default-sidebar.component.scss']
})
export class DefaultSidebarComponent {
  @Output() statusMenu = new EventEmitter<boolean>();
  isExpanded = true;
  showMenu = false;

  constructor() {}

  openAndCloseMenu() {
    this.isExpanded = !this.isExpanded;
    this.showMenu = false;
    this.statusMenu.emit(this.isExpanded);
  }

  expand() {
    this.showMenu = true;
  }

  collapse() {
    this.showMenu = false;
  }
}
