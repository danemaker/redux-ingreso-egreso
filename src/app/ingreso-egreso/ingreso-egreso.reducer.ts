import { createReducer, on } from "@ngrx/store";
import { IngresoEgresoModel } from "../models/ingreso-egreso.model";
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';

export interface State {
  items: IngresoEgresoModel[];
}

export interface AppStateWitchIngresoEgreso extends AppState{
  ingresosEgresos: State;
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
