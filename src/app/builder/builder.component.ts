import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ComponentEventService, openFormEvent, downloadFormEvent } from '../component-event.service';
import { FormBuilder } from 'formiojs';
@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  public form: any = {
    components: []
  };
  public modalRef: BsModalRef;

  @ViewChild('openTemplate', {
    static: true
  }) openTemplate: any;

  @ViewChild('formBuilder', {
    static: true
  }) formBuilder: FormBuilder;

  private eventSubscription: any;

  constructor(private componentEvent: ComponentEventService, private modalService: BsModalService) {
    //
  }

  ngOnInit(): void {
    // get form from session storage
    const lastForm  = localStorage.getItem('BuilderComponent.form');
    if (lastForm) {
      this.form = JSON.parse(lastForm);
    }
    this.eventSubscription = this.componentEvent.event.subscribe((event) => {
      if (event === openFormEvent) {
        this.modalRef = this.modalService.show(this.openTemplate);
      }
      if (event === downloadFormEvent) {
        // download form
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.form, null, 4));
        const anchorElement = document.createElement('a');
        anchorElement.setAttribute("href", dataStr);
        anchorElement.setAttribute("download", "form.json");
        anchorElement.click();
      }
    });

  }

  onChange(event) {
    localStorage.setItem('BuilderComponent.form', JSON.stringify(event.form));
  }

  onSelectForm(event: any) {
    const file = event.addedFiles[0];
    this.modalRef.hide();
    if (file) {
      file.text().then((form: any) => {
        this.form = JSON.parse(form);
      });
    }
  }

}
