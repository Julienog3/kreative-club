import { User } from "../api/user";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vike {
    interface PageContext {
      user: User;
    }
  }
}

// Tell TypeScript this file isn't an ambient module
export {};
