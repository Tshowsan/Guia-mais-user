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

  // private userId: string = null;
  // private guiaId: string = null;
  public user: User = {};
  // private loading: any;
  private userSubscription: Subscription;

  // @Input() usuarioDetalharForm: FormGroup;

  // detalharUsuario() {
  //   this.usuarioDetalharForm = this.formBuilder.group({
  //     id: [''],
  //     nome: [''],
  //     email: [''],
  //     senha: [''],
  //     telefone: ['']
  //   });
  // }

  constructor(
    // public router: Router,
    // private activatedRoute: ActivatedRoute,
    // private formBuilder: FormBuilder,
    // public loadingController: LoadingController,
    private authService: AuthService
    //private usuarioService: UsuarioService
  ) {
    // this.user = this.authService.getAuth().currentUser;

    if (this.user) this.loadUser();
  }

  ngOnInit() {
    // this.detalharUsuario();
    //this.getUsuarioById(1);
  }

  loadUser() {
    this.userSubscription = this.authService.getUser(this.authService.getAuth().currentUser.uid).subscribe(data => {
      this.user = data;
    });
  }

}
