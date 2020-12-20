import { Component, OnInit } from "@angular/core";
import { MultiDataSet, Label } from "ng2-charts";
import { Store } from "@ngrx/store";
import { IngresoEgresoModel } from "../../models/ingreso-egreso.model";
import { AppStateWitchIngresoEgreso } from "../ingreso-egreso.reducer";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;

  totalIngreso: number = 0;
  totalEgreso: number = 0;

  public doughnutChartLabels: Label[] = ["Ingresos", "Egresos"];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppStateWitchIngresoEgreso>) {}

  ngOnInit() {
    this.store
      .select("ingresosEgresos")
      .subscribe(({ items }) => this.generarDetalles(items));
  }

  generarDetalles(items: IngresoEgresoModel[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.totalIngreso = 0;
    this.totalEgreso = 0;
    items.forEach((item) => {
      if (item.tipo === "ingreso") {
        this.totalIngreso += item.monto;
        this.ingresos++;
      } else {
        this.totalEgreso += item.monto;
        this.egresos++;
      }
    });

    this.doughnutChartData = [[this.totalIngreso, this.totalEgreso]];
  }
}
