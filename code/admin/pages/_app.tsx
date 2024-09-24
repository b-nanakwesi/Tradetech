import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { StateProvider } from '@/redux/StateProvider'
import reducer from '@/redux/reducer'
import initialState from '@/redux/initialState'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <StateProvider reducer={reducer} initialState={initialState}>
          <Component {...pageProps} />
        </StateProvider>
    </>
  )
}
