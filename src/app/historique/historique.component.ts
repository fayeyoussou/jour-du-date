import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HistoriqueService} from "../services/historique.service";
import {ITDates} from "../model/it_dates";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent {
  dates : ITDates[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public uid: string,
    public dialogRef: MatDialogRef<HistoriqueComponent>,
    private service : HistoriqueService

  ) {
    this.service.getListeDate(this.uid).subscribe(x=>{
      this.dates = x;
    });
  }

  getDateAString(jourRecherche: Timestamp):string {
    const milliseconds = jourRecherche.seconds * 1000 + jourRecherche.nanoseconds / 1000000;
    return this.service.getDateBString(new Date(milliseconds));
  }
  getDateString(jourRecherche: Timestamp):string {
    const milliseconds = jourRecherche.seconds * 1000 + jourRecherche.nanoseconds / 1000000;
    return this.service.getDateString(new Date(milliseconds));
  }
}
