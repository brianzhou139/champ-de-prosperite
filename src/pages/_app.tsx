import '@styles/globals.css'
import type { AppProps } from 'next/app'
//import { Windmill } from '@windmill/react-ui';
import { AuthProvider } from '@context/auth'; 

// _app.tsx or wherever you import Windmill UI
import dynamic from 'next/dynamic'

// Dynamically import Windmill UI and disable SSR
const Windmill = dynamic(
  () => import('@windmill/react-ui').then((mod) => mod.Windmill), // make sure to import the correct export
  { ssr: false }
)

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
      <Windmill usePreferences={true}>
          <Component {...pageProps} />
      </Windmill>
    </AuthProvider>
    );
}
