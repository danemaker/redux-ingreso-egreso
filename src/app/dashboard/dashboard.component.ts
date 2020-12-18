import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { AppState } from "../app.reducer";
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { UserModel } from '../models/user.model';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  authSuscription: Subscription;
  ingresosEgresosSuscription: Subscription;
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) {}

  public ngOnInit(): void {
    this.authSuscription = this.store
      .select("user")
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({user}) => {
        this.ingresosEgresosSuscription = this.ingresoEgresoService.ingresosEgresosListener(user.uid).subscribe(ingresosEgresosUser =>{
          console.log(ingresosEgresosUser);
          this.store.dispatch(setItems({items: ingresosEgresosUser}));
        })
      });
  }

  public ngOnDestroy(): void {
    this.authSuscription.unsubscribe();
    this.ingresosEgresosSuscription.unsubscribe();
  }
}
