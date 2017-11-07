import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  message;

  private _electronService: ElectronService;

  constructor(service: ElectronService) {
    console.log('AppComponent::constructor _electronService: ' + service);
    console.log('AppComponent::constructor _electronService renderer: ' + service.ipcRenderer);
    this._electronService = service;
  }

  onChange() {
    console.log('OnChange message: ' + this.message);
    this._electronService.ipcRenderer.send('wpf-app', this.message);
  }

  get diagnostic() { return JSON.stringify(this.message); }
}
