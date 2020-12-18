import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { IngresoEgresoModel } from "../models/ingreso-egreso.model";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";
import { AppState } from "../app.reducer";
import { Store } from "@ngrx/store";
import { isLoading, stopLoading } from "../shared/ui.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm: FormGroup;
  tipo: string = "ingreso";
  cargando: boolean = false;
  ingresoEgresoSuscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  public ngOnInit() {
    this.ingresoEgresoForm = this.formBuilder.group({
      descripcion: ["", Validators.required],
      monto: ["", Validators.required],
    });

    this.ingresoEgresoSuscription = this.store.select("ui").subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  public ngOnDestroy(): void {
    this.ingresoEgresoSuscription.unsubscribe();
  }

  guardar() {
    if (this.ingresoEgresoForm.invalid) {
      return;
    }
    this.store.dispatch(isLoading());

    const { descripcion, monto } = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgresoModel(descripcion, monto, this.tipo);
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoEgresoForm.reset();
        this.store.dispatch(stopLoading());
        Swal.fire("Registro creado", descripcion, "success");
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());
        Swal.fire("Error", error.message, "error");
      });
  }
}
