"use client";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { jasonHouStore } from "./store";

export default function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={jasonHouStore}>{children}</Provider>;
}
