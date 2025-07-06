import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ContractProvider } from "../context/ContractProvider";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContractProvider>
      <Component {...pageProps} />
    </ContractProvider>
  );
}

