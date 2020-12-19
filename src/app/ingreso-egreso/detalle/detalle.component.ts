import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import Swal from "sweetalert2";
import { AppState } from "../../app.reducer";
import { IngresoEgresoModel } from "../../models/ingreso-egreso.model";
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: [],
})
export class DetalleComponent implements OnInit {
  ingresosEgresos: IngresoEgresoModel[] = [];
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) {}

  ngOnInit() {
    this.store
      .select("ingresosEgresos")
      .subscribe(({ items }) => (this.ingresosEgresos = items));
  }

  borrar(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
    .then(() => Swal.fire('Borrar', 'Registro borrado', 'success'))
    .catch(error => Swal.fire('Error', error.menssage, 'error'));
  }
}
