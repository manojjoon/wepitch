import { Component, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-image-formatter',
  template: `<button class="btn btn-primary" type="button" (click)="invokeAction('edit')">Edit</button>
  | <a class="text-danger" (click)="invokeAction('delete')">Delete</a>
  `
})
export class ActionComponent implements ICellRendererAngularComp {
    params: any;
    agInit(params: any) {
        this.params = params;
    }

    invokeAction(actionId: string){
        debugger;
        console.log(actionId);
        this.params.context.action({actionId, item: this.params.data});
    }

    refresh(): boolean {
        return false;
    }
}
