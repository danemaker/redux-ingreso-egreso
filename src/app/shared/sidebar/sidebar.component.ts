import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { AppState } from "../../app.reducer";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  userName: string = "";
  userSuscription: Subscription;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSuscription = this.store
      .select("user")
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => (this.userName = user.nombre));
  }

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
  }

  logout() {
    this.authService.logout().then((singOut) => {
      this.router.navigate(["/login"]);
    });
  }
}
