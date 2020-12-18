import { createReducer, on } from "@ngrx/store";
import { IngresoEgresoModel } from "../models/ingreso-egreso.model";
import { setItems, unSetItems } from './ingreso-egreso.actions';

export interface State {
  items: IngresoEgresoModel[];
}

export const initialState: State = {
  items: [],
};

const _ingresoEgresoReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

export function ingresoEgresoReducer(state, action) {
  return _ingresoEgresoReducer(state, action);
}
