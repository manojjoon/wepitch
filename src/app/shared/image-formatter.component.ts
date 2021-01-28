import { Component} from '@angular/core';


@Component({
    selector: 'app-image-formatter',
    template: `<img border="0" width="20" height="30" [src]='params.value | safe'>` })

  export class ImageFormatterComponent {
    params: any;
    agInit(params: any){
      this.params = params;
    }
  }
