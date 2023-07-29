import { Observable, Subscribable, Subscription } from 'rxjs';
import {Component, ElementRef , OnInit, ViewChild} from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from './auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import {HistoriqueService} from "./services/historique.service";
import {HistoriqueComponent} from "./historique/historique.component";
import {MessagerieComponent} from "./messagerie/messagerie.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = "date du jour"
  name = ""
  user : any
  @ViewChild('animatedText', { static: true }) animatedText!: ElementRef;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isLoggedIn: boolean = false;
  private subscription!: Subscription;

  // constructor(private router: Router, private breakpointObserver: BreakpointObserver, private angularFireAuth: AngularFireAuth) { }
  public greeting = "";

  ngOnInit(): void {
    this.subscription = this.angularFireAuth.authState.subscribe((user) => {
      this.isLoggedIn = !!user;
      if(user != null){
        this.name =user.displayName != null ? user.displayName : ""
        this.user = user;
      }
    });
  }

  logout() {
    this.angularFireAuth.signOut().then(x=>{
      console.log(x)

    });

    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()

  }

    isCollapsed = false;
    isLogin = false
  selectedDate: Date |undefined;
  messageText ="Bienvenue";
  aujourdhui = new Date()
  constructor(
      private breakpointObserver: BreakpointObserver,
      private angularFireAuth: AngularFireAuth,
      public dialog: MatDialog,
      private service : HistoriqueService
  ) {

    }
    showAuth(isLogin: boolean) {
      this.dialog.open(LoginComponent,{
        width : '50%'
      })
    }
  submitForm() {
    if (this.selectedDate) {
      if (this.user != null) {
        this.service.addDate(this.user.uid, this.selectedDate)
      }
      this.messageText = this.service.getDateString(this.selectedDate)
    }
    else {
        // Handle case where no date is selected
        this.messageText = 'Veuillez choisir une date d\'abord';
      }
  }

  showHistoriqueModale() {
    this.dialog.open(HistoriqueComponent,{
      data : this.user.uid,
      width : '50%'
    })
  }

  openChatModal() {
    this.dialog.open(MessagerieComponent,{
      data :  this.user.uid,
      position : {
        bottom : '5%',
        right : '5%'
      } ,
      panelClass :'custom-modal-panel'
    })
  }
}
