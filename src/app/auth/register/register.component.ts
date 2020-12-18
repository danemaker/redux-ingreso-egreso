import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy{
  registerForm: FormGroup;
  cargando: boolean = false;
  uiSuscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private auhtService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}


  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ["", Validators.required],
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

  public crearUsuario() {
/*     Swal.fire({
      title: "Loading!",
      didOpen: () => {
        Swal.showLoading();
      },
    }); */
    this.store.dispatch(isLoading());
    const { nombre, correo, password } = this.registerForm.value;
    this.auhtService
      .crearUsuario(nombre, correo, password)
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
