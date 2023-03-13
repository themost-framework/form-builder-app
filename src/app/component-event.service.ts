import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export const openFormEvent = {
  type: 'form:open'
}

export const downloadFormEvent = {
  type: 'form:download'
}

@Injectable({
  providedIn: 'root'
})
export class ComponentEventService {
  public event: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() {

  }
}
