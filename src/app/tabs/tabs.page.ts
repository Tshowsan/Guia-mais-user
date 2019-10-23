import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user : User = {};

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private authService: AuthService,
  ) {
    this.user = this.authService.getAuth().currentUser;
  }
 
  
}
