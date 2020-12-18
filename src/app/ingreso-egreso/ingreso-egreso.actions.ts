import { createAction, props } from "@ngrx/store";
import { IngresoEgresoModel } from "../models/ingreso-egreso.model";

export const setItems = createAction(
  "[Items] Set Items",
  props<{ items: IngresoEgresoModel[] }>()
);
export const unSetItems = createAction("[Items] Unset Items");
