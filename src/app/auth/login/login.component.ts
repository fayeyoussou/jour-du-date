import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar ,public dialogRef: MatDialogRef<LoginComponent>,private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {}

  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log(data)
    this._snackBar.open((data.authResult.additionalUserInfo?.isNewUser ? "Bienvenue " : "Bon retour parmi nous")+data.authResult.user?.displayName ,undefined,{
      verticalPosition : 'top',
      horizontalPosition : 'center',
      panelClass : ['mat-toolbar','mat-success'],
      duration : 3000
    })
    this.dialogRef.close(data)

  }

  errorCallback(data: FirebaseUISignInFailure) {
    console.log(data)
    this._snackBar.open("Echec connexion ! Veuillez reesayer","D'accord!!",{
      verticalPosition : 'top',
      horizontalPosition : 'center',
      panelClass : ['mat-toolbar','mat-danger'],
      duration : 3000
    })
  }

  uiShownCallback() {
    this._snackBar.open("Veuillez choisir une mode de connection","D'accord!!",{
      verticalPosition : 'top',
      horizontalPosition : 'center',
      panelClass : ['mat-toolbar','mat-primary'],
      duration : 3000
    })  }
}
