import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-spinner-dialog',
  template: '<mat-spinner></mat-spinner>',
  styles: ['']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
