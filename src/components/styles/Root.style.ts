import { css } from "lit";

export const rootStyle = css`
  :host {
    --white: rgba(255, 255, 255, 0.8);
    --dark: #031525;
    --medium: rgba(13, 34, 54);
    --light: #293d55;
    --highlight: rgb(233, 120, 22);
    --black: black;
    --backdrop: rgba(3, 21, 37, 0.8);
  }
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--white);
    background-color: var(--dark);
    height: 100vh;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  span {
    text-align: right;
  }
  main {
    margin-top: 50px;
  }
`;
