import { css } from "lit";

export const dialogStyle = css`
  .wrapper {
    width: 100vw;
    height: 100vw;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--backdrop);
    display: flex;
    justify-content: center;
  }
  .dialog {
    padding: 0;
    background-color: var(--medium);
    border-radius: 10px;
    border: none;
    position: fixed;
    margin-top: 100px;
    width: 300px;
  }
  input {
    border-radius: 5px;
    padding: 10px;
    background-color: var(--light);
    border: none;
    color: var(--white);
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  form * {
    margin: 5px;
  }
  .dialog-title {
    color: var(--highlight);
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  ::placeholder {
    color: var(--dark);
  }
  .login-error,
  .registration-error {
    white-space: pre-wrap;
    color: var(--highlight);
    text-align: center;
  }
  .close {
    background-color: transparent;
    color: var(--white);
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 1;
  }
`;
