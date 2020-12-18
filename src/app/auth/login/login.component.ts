import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";
import { AppState } from '../../app.reducer';
import { Store } from "@ngrx/store";
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm: FormGroup;
  cargando: boolean = false;
  uiSuscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });


    this.uiSuscription = this.store.select('ui').subscribe(ui =>{
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe();
  }

  login() {
/*     Swal.fire({
      title: "Loading!",
      didOpen: () => {
        Swal.showLoading();
      },
    }); */
    this.store.dispatch(isLoading());
    const { correo, password } = this.loginForm.value;
    this.authService
      .login(correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        this.store.dispatch(stopLoading());
        /* Swal.close(); */
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  }
}
