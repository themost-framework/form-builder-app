import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewContainerRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ComponentEventService, openFormEvent, downloadFormEvent, copyFormEvent, previewFormEvent, viewSourceEvent } from '../component-event.service';
import { FormBuilder } from 'formiojs';
import { Clipboard } from '@angular/cdk/clipboard';
import { AceEditorComponent } from 'ng2-ace-editor';
import { Input } from 'formiojs/types/components/_classes/input/input';
@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuilderComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  public form: any = {
    components: []
  };
  public modalRef: BsModalRef;

  public source: string;

  public lastError?: any;

  public sample: any = {};

  @ViewChild('openTemplate', {
    static: true
  }) openTemplate: any;

  @ViewChild('previewTemplate', {
    static: true
  }) previewTemplate: any;

  @ViewChild('viewSourceTemplate', {
    static: true
  }) viewSourceTemplate: any;

  @ViewChild('formBuilder', {
    static: true
  }) formBuilder: FormBuilder;

  @ViewChild('editor', {
    static: false
  }) editor: AceEditorComponent;

  private eventSubscription: any;

  constructor(private componentEvent: ComponentEventService,
    private modalService: BsModalService,
    private clipboard: Clipboard) {
    //
  }

  ngAfterViewInit(): void {
    // get form from session storage
    const lastForm  = localStorage.getItem('BuilderComponent.form');
    if (lastForm) {
      this.form = JSON.parse(lastForm);
    }
    this.eventSubscription = this.componentEvent.event.subscribe((event) => {
      if (event === openFormEvent) {
        this.modalRef = this.modalService.show(this.openTemplate);
      }
      if (event === viewSourceEvent) {
        this.lastError = null;
        const copy = localStorage.getItem('BuilderComponent.form');
        this.source = JSON.stringify(JSON.parse(copy), null, 4);
        this.modalRef = this.modalService.show(this.viewSourceTemplate, {
          class: 'modal-xl',
          keyboard: false,
          ignoreBackdropClick: true
        });

      }
      if (event === previewFormEvent) {
        if (this.form && this.form.sample) {
          this.sample = this.form.sample;
        }
        this.modalRef = this.modalService.show(this.previewTemplate, {
          class: 'modal-xl',
          keyboard: false,
          ignoreBackdropClick: true
        });
      }
      if (event === copyFormEvent) {
        const copy = localStorage.getItem('BuilderComponent.form');
        if (copy) {
          this.clipboard.copy(JSON.stringify(JSON.parse(copy), null, 4));
        }
      }
      if (event === downloadFormEvent) {
        // download form
        const activeForm = localStorage.getItem('BuilderComponent.form');
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(JSON.parse(activeForm), null, 4));
        const anchorElement = document.createElement('a');
        anchorElement.setAttribute("href", dataStr);
        anchorElement.setAttribute("download", "form.json");
        anchorElement.click();
      }
    });

  }

  onChange(event) {
    if (event.form) {
      localStorage.setItem('BuilderComponent.form', JSON.stringify(event.form));
    }
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

  saveSource() {
    try {
      this.form = JSON.parse(this.source);
      localStorage.setItem('BuilderComponent.form', JSON.stringify(this.form))
      this.modalRef.hide();
      this.lastError = null;
    } catch (error) {
      this.lastError = error;
    }
  }
  closeSource() {
    this.lastError = null;
    this.modalRef.hide();
  }

  onSourceChange(event: any) {
    this.lastError = null;
  }

}
