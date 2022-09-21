import { App } from "../lib";

declare global {
  interface Window {
    app: App;
  }
}
