export class UserModel {
  static fromFirestore({ uid, nombre, correo }) {
    return new UserModel(uid, nombre, correo);
  }
  constructor(
    public uid: string,
    public nombre: string,
    public correo: string
  ) {}
}
