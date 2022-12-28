import type { AppProps } from 'next/app'
import { trpc } from '@/utils/trpc'

import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp);
