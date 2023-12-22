import { LitElement, TemplateResult, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Authentication } from "../services/Authentication";
import { AuthSubscriber } from "../services/AuthSubscriber";
import { User } from "firebase/auth";

@customElement("tribe-main")
export class Main extends LitElement implements AuthSubscriber {
  @property({ type: Object })
  public authentication!: Authentication;
  @state()
  private user: User | null = null;
  // public static styles = css`
  //   :host {
  //     display: none;
  //   }
  // `;

  // a connectedCallBacket eredeti funkcionalitását megtartjuk + kibővítjük
  public connectedCallback(): void {
    super.connectedCallback();
    this.authentication.subscribe(this);
  }
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.authentication.unsubscribe(this);
  }
  public notify(user: User | null): void {
    this.user = user;
  }
  protected render(): TemplateResult | typeof nothing {
    if (!this.user) return nothing
    return html`fasza content van vaze, mert a ${this.user.email} bejelentkezett cigó!`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tribe-main": Main;
  }
}
