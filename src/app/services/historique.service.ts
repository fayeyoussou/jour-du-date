import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {DayDate} from "../model/day_date";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ITDates} from "../model/it_dates";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  datePipe = new DatePipe('fr')
  aujourdhui = new Date()
  constructor(
    private firestore: AngularFirestore

  ) {

  }
  getListeDate(ui : string):  Observable<ITDates[]> {
    return this.firestore.collection<ITDates>(ui).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return a.payload.doc.data() as ITDates;
        });
      })
    );
  }
  public async addDate(ui :string,dat : Date) {
    let fm = await this.firestore.collection(ui).add({
      'jourDeRecherche' : new Date(),
      'jourRecherche' : dat
    })
  }
  getDateBString(selectedDate: Date) : string {
    return this.datePipe.transform(selectedDate, 'dd/MMM/yyyy', 'fr') || '';
  }
  getDateString(selectedDate: Date) : string {
    let messageText = ""

      let text = "";
      if (this.aujourdhui.getDate() == selectedDate.getDate() && this.aujourdhui.getMonth() == selectedDate.getMonth() && this.aujourdhui.getFullYear() == selectedDate.getFullYear()){
        text = "est un "
      }else if(selectedDate > this.aujourdhui){
        text = "sera un "
      } else {
        text = "etait un "
      }
      // Format the date using the DatePipe to display it in French
      messageText = this.datePipe.transform(selectedDate, 'd MMMM yyyy ', 'fr') as string;
      messageText +=text;
      messageText += this.datePipe.transform(selectedDate, 'EEEE', 'fr') as string;
      return messageText;

  }
}
