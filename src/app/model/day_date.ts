export class DayDate {
  jourDeRecherche : Date
  jourRecherche : Date
  constructor(data : any) {
    this.jourDeRecherche = data['jourDeRecherche']
    this.jourRecherche = data['jourRecherche']
  }
}
