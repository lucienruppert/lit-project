import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import logo from "../assets/tribe.svg";
import { buttonStyle } from "./styles/Button.style";
import { User } from "firebase/auth";
import { Authentication } from "../services/Authentication";
import { AuthSubscriber } from "../services/AuthSubscriber";

type HeaderButtonDescriptors = {
  loggedIn: Array<ButtonDescriptor>;
  loggedOut: Array<ButtonDescriptor>;
};

type ButtonDescriptor = {
  title: string;
  handleClick: EventListener;
};

@customElement("tribe-header")
export class Header extends LitElement implements AuthSubscriber {
  @property({ type: Object })
  public authentication!: Authentication;
  @state()
  private user: User | null = null;

  public connectedCallback(): void {
    super.connectedCallback();
    this.authentication?.subscribe(this);
  }
  public notify(user: User | null): void {
    this.user = user;
  }

  public static styles = [
    buttonStyle,
    css`
      :host {
        display: flex;
        width: 100vw;
        align-items: center;
        justify-content: center;
        background-color: var(--dark);
        border-bottom: 1px solid var(--highlight);
        height: 60px;
      }
      .logo {
        height: 50px;
        width: 50px;
      }
      nav {
        display: flex;
        justify-content: flex-end;
        gap: 20px;
        width: 200px;
      }
      button {
        background-color: transparent;
        font-size: 12px;
      }
      button:hover {
        filter: drop-shadow(0 3px 7px var(--light));
        color: var(--highlight);
      }
      #user-info {
        color: var(--highlight);
        padding-left: 20px;
        width: 300px;
      }
    `,
  ];

  @property({ type: Object })
  private buttonDescriptors: HeaderButtonDescriptors = {
    loggedIn: [
      {
        title: "Kilépés",
        handleClick: () =>
          this.authentication
            .logout()
            .catch((error) => this.handleLogoutError(error)),
      },
    ],
    loggedOut: [
      {
        title: "Regisztráció",
        handleClick: () => {
          const showRegistration = new CustomEvent("show-registration", {
            composed: true,
            detail: { message: true },
          });
          this.dispatchEvent(showRegistration);
        },
      },
      {
        title: "Belépés",
        handleClick: () => {
          const showLogin = new CustomEvent("show-login", {
            composed: true,
            detail: { message: true },
          });
          this.dispatchEvent(showLogin);
        },
      },
    ],
  };

  protected render(): TemplateResult | void {
    return html`<img src="${logo}" class="logo" alt="Tribe logo" />
      <span id="user-info" class="logged-in">${this.user?.email}</span>
      ${this.renderNavigation()}`;
  }

  private renderNavigation() {
    const currentDescriptors = this.user
      ? this.buttonDescriptors.loggedIn
      : this.buttonDescriptors.loggedOut;
    return html`<nav>
      ${currentDescriptors.map(
        (button) =>
          html`<button @click=${button.handleClick}>${button.title}</button>`
      )}
    </nav>`;
  }

  private handleLogoutError(reason: unknown): void {
    alert((reason as Error).message);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tribe-header": Header;
  }
}
