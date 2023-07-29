import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export class ITDates {
  jourDeRecherche : Timestamp
  jourRecherche : Timestamp
  constructor(data : any) {
    this.jourDeRecherche = data['jourDeRecherche']
    this.jourRecherche = data['jourRecherche']
  }
}
