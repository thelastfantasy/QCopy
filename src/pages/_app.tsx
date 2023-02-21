import type { AppProps } from "next/app";

import "../style.scss";
import "../App.scss";
import { useEffect } from "react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  async function setupAppWindow() {
    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    appWindow.show();
  }

  useEffect(() => {
    setupAppWindow();
  }, []);

  return <Component {...pageProps} />;
}
