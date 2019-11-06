import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {

  public user: User = {};
  private userSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { 
    this.loadUser();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  loadUser() {
    this.userSubscription = this.authService.getUser(this.authService.getAuth().currentUser.uid).subscribe(data => {
      this.user = data;
    });
  }


}

