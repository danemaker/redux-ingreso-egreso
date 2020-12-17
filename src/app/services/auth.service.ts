import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) {}

  initAuthListener() {
    this.auth.authState.subscribe((firebaseUser) => {
      console.log(firebaseUser)
    });
  }

  crearUsuario(nombre: string, correo: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(correo, password).then(({user}) =>{
      const newUser = new UserModel(user.uid, nombre, user.email);

      return this.firestore.doc(`${user.uid}/usuario`).set({...newUser});
    });
  }

  login(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(firebaseUser => firebaseUser != null)
    )
  }
}
