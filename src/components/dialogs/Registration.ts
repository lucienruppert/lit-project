import { LitElement, TemplateResult, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Authentication } from "../../services/Authentication";
import { buttonStyle } from "../styles/Button.style";
import { dialogStyle } from "../styles/Dialog.style";

@customElement("tribe-registration")
export class Registration extends LitElement {
  @property({ type: Object })
  public authentication!: Authentication;
  @property({ type: Boolean })
  public isShown: boolean | undefined;
  @state()
  private isLoading = false;
  @state()
  private errorMessage = "";
  public static styles = [buttonStyle, dialogStyle];
  protected render(): TemplateResult | void {
    if (!this.isShown) return html``;
    return html`<div class="wrapper">
      <div class="dialog">
        <button class="close" @click=${this.dispatchCloseEvent}>X</button>
        ${this.renderForm()}
        ${this.isLoading
          ? html`<loading-indicator></loading-indicator>`
          : nothing}
      </div>
    </div>`;
  }

  private renderForm(): TemplateResult {
    return html`<form class="registration" @submit=${this.registerUser}>
      <span class="dialog-title">Regisztráció</span>
      <input type="text" placeholder="Email" name="email" />
      <input type="password" placeholder="Jelszó" name="password" />
      <button>Elküld</button>
      <span class="registration-error">${this.errorMessage}</span>
    </form> `;
  }

  private dispatchCloseEvent(): void {
    const closeRegistration = new CustomEvent("close-registration", {
      composed: true,
      detail: { message: false },
    });
    this.dispatchEvent(closeRegistration);
  }

  private async registerUser(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form?.password.value;
    this.isLoading = true;
    try {
      await this.authentication.register(email, password);
      this.dispatchCloseEvent();
    } catch (error: unknown) {
      const typedError = error as Error;
      this.errorMessage = typedError.message;
    } 
    this.isLoading = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tribe-registration": Registration;
  }
}
