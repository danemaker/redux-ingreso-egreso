import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { UserModel } from '../models/user.model';
import { AppState } from "../app.reducer";
import { Store } from "@ngrx/store";
import { setUser, unSetUser } from "../auth/auth.actions";
import { Subscription } from "rxjs";
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userSuscription: Subscription;
  _user: UserModel;
  constructor(
    public auth: AngularFireAuth,
    private store: Store<AppState>,
    private firestore: AngularFirestore
  ) {}

  get user(){
    return this._user;
  }
  initAuthListener() {
    this.auth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        this.userSuscription = this.firestore
          .doc(`${firebaseUser.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = UserModel.fromFirestore(firestoreUser);
            this._user = user;
            this.store.dispatch(setUser({ user }));
          });
      } else {
        if (this.userSuscription) {
          this.userSuscription.unsubscribe();
          console.log('userSuscription unsuscribe');
        }
        this._user = null;
        this.store.dispatch(unSetUser());
        this.store.dispatch(unSetItems());
      }
    });
  }

  crearUsuario(nombre: string, correo: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(correo, password)
      .then(({ user }) => {
        const newUser = new UserModel(user.uid, nombre, user.email);

        return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
      });
  }

  login(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map((firebaseUser) => firebaseUser != null)
    );
  }
}
