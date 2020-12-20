import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { DashboardComponent } from "../dashboard/dashboard.component";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { OrdenRegistrosPipe } from "../pipes/orden-registros.pipe";
import { SharedModule } from "../shared/shared.module";
import { ChartsModule } from "ng2-charts";
import { DashboardRoutesModule } from "../dashboard/dashboard-routes.module";
import { StoreModule } from "@ngrx/store";
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenRegistrosPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ChartsModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutesModule
  ],
})
export class IngresoEgresoModule {}
