import { AuthService } from 'src/app/services/auth.service';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public user: User = {};
  private userSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) {

    if (this.user) this.loadUser();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  loadUser() {
    this.userSubscription = this.authService.getUser(this.authService.getAuth().currentUser.uid).subscribe(data => {
      this.user = data;
    });
  }

}
