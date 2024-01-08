import { DehydratedState } from "@tanstack/react-query";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vike {
    interface PageContext {
      dehydratedState: DehydratedState;
    }
  }
}

// Tell TypeScript this file isn't an ambient module
export {};
