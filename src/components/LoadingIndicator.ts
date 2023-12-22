import { LitElement, TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { loadingIndicatorStyle } from "./styles/LoadingIndicator.style";

@customElement("loading-indicator")
export class LoadingIndicator extends LitElement {
  public static styles = loadingIndicatorStyle;
  protected render(): TemplateResult {
    return html` <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "loading-indicator": LoadingIndicator;
  }
}
