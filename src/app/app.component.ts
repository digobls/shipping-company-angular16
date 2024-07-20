import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  menuIsOpen = true;

  checkStatusMenu(statusMenu: boolean) {
    this.menuIsOpen = statusMenu;
  }
}
