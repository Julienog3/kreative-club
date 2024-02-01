import { DehydratedState } from "@tanstack/react-query";
import { User } from "../api/user";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vike {
    interface PageContext {
      dehydratedState: DehydratedState;
      user: User;
    }
  }
}

// Tell TypeScript this file isn't an ambient module
export {};
