import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/theme";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Nitigya Toddle</title>
			</Head>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
