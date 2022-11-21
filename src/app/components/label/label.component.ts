import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {


  text!:string;

  constructor() { }

  ngOnInit(): void {
  }

  setText(text:string){
    this.text = text;
  }

}
