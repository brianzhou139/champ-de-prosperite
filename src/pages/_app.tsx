import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Windmill } from '@windmill/react-ui';
import { AuthProvider } from '@context/auth';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
      <Windmill usePreferences={true}>
          <Component {...pageProps} />
      </Windmill>
    </AuthProvider>
    );
}
