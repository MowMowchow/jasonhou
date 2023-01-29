"use client";

import { PropsWithChildren } from "react";
import ReduxProvider from "./reduxProvider";

type P = PropsWithChildren;

export default function Providers({ children }: P) {
  return (
    //
    <ReduxProvider>{children}</ReduxProvider>
  );
}
