import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { rootStyle } from "./styles/Root.style";
import "../services/componentsGetter";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { Authentication } from "../services/Authentication";

@customElement("tribe-root")
export class Root extends LitElement {
  private firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCfijV4DbbD9AfxUFrJS6L4j-iOxFogER8",
    authDomain: "the-project-c2304.firebaseapp.com",
    projectId: "the-project-c2304",
    storageBucket: "the-project-c2304.appspot.com",
    messagingSenderId: "343599314245",
    appId: "1:343599314245:web:d07af408e5c3d7c80aba2c",
    measurementId: "G-SY74FLEXQT",
  };
  private isInitialized = false;
  private authentication!: Authentication;
  @state()
  private isLoginShown = false;
  @state()
  private isRegistrationShown = false;

  private initialize(): void {
    initializeApp(this.firebaseConfig);
    this.authentication = new Authentication();
    this.isInitialized = true;
  }

  constructor() {
    super();
    this.initialize();
    this.addEvents();
  }

  public static styles = rootStyle;
  protected render() {
    if (!this.isInitialized) throw new Error("Root was not initialized");
    return html`<div class="app">
      <tribe-header .authentication=${this.authentication}></tribe-header>
      <tribe-main .authentication=${this.authentication}></tribe-main>
      <tribe-login
        .authentication=${this.authentication}
        .isShown=${this.isLoginShown}
      ></tribe-login>
      <tribe-registration
        .authentication=${this.authentication}
        .isShown=${this.isRegistrationShown}
      ></tribe-registration>
    </div>`;
  }

  private addEvents(): void {
    this.addEventListener("show-login", (event: Event) => {
      this.isLoginShown = (event as CustomEvent).detail.message;
    });
    this.addEventListener("close-login", (event: Event) => {
      this.isLoginShown = (event as CustomEvent).detail.message;
    });
    this.addEventListener("show-registration", (event: Event) => {
      this.isRegistrationShown = (event as CustomEvent).detail.message;
    });
    this.addEventListener("close-registration", (event: Event) => {
      this.isRegistrationShown = (event as CustomEvent).detail.message;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tribe-root": Root;
  }
}
