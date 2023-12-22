import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthSubscriber } from "./AuthSubscriber";

// az AuthStatePublisher, csak modell rétegben létezik
// így semmi köze nincs a megjelenítéshez (semmi DOM manipulációt nem csinálhat)
// szólnia kell azoknak a kódegységeknek (subscribers), akik feliratkoztak a változásra
// azért, hogy ők (view rétegben létezők) a megjelenítésüket hozzá tudják igazítani az új
// auth infóhoz (bejelentkeztünk, kijelentkeztünk)

export class Authentication {
  private auth: Auth;
  private subscribers: Array<AuthSubscriber> = [];

  constructor() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user): void => {
      this.notifySubscribers(user);
    });
  }

  public subscribe(subscriber: AuthSubscriber): void {
    // TODO: handle case when one subscriber subscribes multiple times
    this.subscribers.push(subscriber);
  }
  public unsubscribe(unsubscriber: AuthSubscriber): void {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== unsubscriber
    );
  }
  public async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }
  public async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }
  public async logout(): Promise<void> {
    await signOut(this.auth);
  }

  private notifySubscribers(user: User | null): void {
    this.subscribers.forEach((subscriber) => subscriber.notify(user));
  }

  // law of Demeter - Demeter törvénye
  // public getAuthInstance(): Auth {
  //   return this.auth;
  // }

  // private handleChange = (user: User | null) => {
  //   const loggedInContent: NodeListOf<Element> =
  //     document.querySelectorAll(".logged-in")!;
  //   const loggedOutContent: NodeListOf<Element> =
  //     document.querySelectorAll(".logged-out")!;
  //   this.toggleContent(loggedOutContent, loggedInContent, user);
  // };

  // private toggleContent = (
  //   loggedOutContent: NodeListOf<Element>,
  //   loggedInContent: NodeListOf<Element>,
  //   user: User | null
  // ): void => {
  //   const userInfo: HTMLElement = document.querySelector("#user-info")!;
  //   for (const element of loggedOutContent) {
  //     element.classList.toggle("hidden");
  //   }
  //   for (const element of loggedInContent) {
  //     element.classList.toggle("hidden");
  //   }
  //   userInfo.innerHTML = user?.email || "";
  // };
}

// "középső réteg"           "alsó réteg"
// TribeAuthService --> FireBase auth témák

// jelenleg:
// "felső réteg"     "alsó réteg"
//  Header ----> FireBase auth téma

// ideálisan:
// "felső réteg"     "középső réteg"      "alsó réteg" (általában 3rd party)
//  Header ----> TribeAuthService --X--> FireBase auth témák

// felső rétegbeli kód:
// nincs olyan, hogy this.középső.getAlsóréteg(); --- law of demeter
// magyarán a header sosem tudhat az alsórétegbeli 3rd party FireBase-ről
