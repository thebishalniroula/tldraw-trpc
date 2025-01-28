import { ExampleContext } from "@/example-context";
import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ExampleContext.Provider value={{ example: "This is an example" }}>
      <Component {...pageProps} />
    </ExampleContext.Provider>
  );
}
export default trpc.withTRPC(App);
