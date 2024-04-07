import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { app } from "../conf/conf";

export class AuthService {
  account = getAuth(app);

  async createAccount({ email, password, name }) {
    try {
      const userData = await createUserWithEmailAndPassword(
        this.account,
        email,
        password,
        name
      );

      return userData;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return signInWithEmailAndPassword(this.account, email, password);
    } catch {
      console.log("login error");
    }
  }

  async getCurrentUser() {
    return new Promise((res, rej) => {
      const unSubscribe = onAuthStateChanged(
        this.account,
        (user) => {
          unSubscribe();
          res(user);
          
        },
        rej
      );
    });
  }
  logout() {
    signOut(this.account);
  }
}

export const authService = new AuthService();
