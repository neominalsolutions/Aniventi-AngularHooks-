import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularInputOutPutAndHooksSample';
  size!:string;
  show:boolean = true;

  onClick(){
    alert('button1 click');
  }

  onSizeChanged(event:any){
    // console.log('event',event)
  }
}
