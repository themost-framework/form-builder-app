import { Component } from '@angular/core';
import { ComponentEventService, openFormEvent, downloadFormEvent, copyFormEvent, previewFormEvent, viewSourceEvent } from './component-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'form-builder-app';
  public readonly openForm = openFormEvent;
  public readonly downloadForm = downloadFormEvent;
  public readonly copyForm = copyFormEvent;
  public readonly previewForm = previewFormEvent;
  public readonly viewSource = viewSourceEvent;
  constructor(public componentEvent: ComponentEventService) {

  }
}
