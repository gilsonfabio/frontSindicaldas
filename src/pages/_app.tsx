import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <ThemeProvider attribute="class" >
      <AnyComponent {...pageProps} />
    </ThemeProvider>
  ) 
}

export default MyApp
