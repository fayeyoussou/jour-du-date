import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent {
  data : any
  constructor(public dialogRef: MatDialogRef<MessagerieComponent>,) {
    this.data  = {
      friends : [ {name :"Youssou"}, {name :"Mody"}, {name :"Mamadou"}, {name :"Khady Diawara"} ]
    }
  }
}
name :{}
