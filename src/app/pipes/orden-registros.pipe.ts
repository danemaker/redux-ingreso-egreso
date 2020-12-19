import { Pipe, PipeTransform } from "@angular/core";
import { IngresoEgresoModel } from "../models/ingreso-egreso.model";

@Pipe({
  name: "ordenRegistros",
})
export class OrdenRegistrosPipe implements PipeTransform {
  transform(items: IngresoEgresoModel[]): IngresoEgresoModel[] {
    return Array.from(items).sort((a, b) => {
      if (a.tipo === "ingreso") {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
