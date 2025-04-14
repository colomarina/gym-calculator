import React from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";

import { Provider } from "@/components/ui/provider";

const App = ({ Component, pageProps }: AppProps) => (
  <Provider>
    <Component {...pageProps} />
  </Provider>
);

export default App;
