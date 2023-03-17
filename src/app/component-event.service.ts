import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export const openFormEvent = {
  type: 'form:open'
}

export const copyFormEvent = {
  type: 'form:copy'
}

export const downloadFormEvent = {
  type: 'form:download'
}

export const previewFormEvent = {
  type: 'form:preview'
}

export const viewSourceEvent = {
  type: 'form:source'
}

@Injectable({
  providedIn: 'root'
})
export class ComponentEventService {
  public event: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() {

  }
}
