// Fix for react-i18next + React 19 type conflicts
// https://www.i18next.com/overview/typescript
import "i18next";
import "react-i18next";
import type { ReactNode } from "react";

declare module "i18next" {
  interface CustomTypeOptions {
    allowObjectInHTMLChildren: true;
  }
}

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: Record<string, string>;
    };
  }

  // Override ReactI18NextChildren to be compatible with ReactNode
  export type ReactI18NextChildren = ReactNode;
}
