import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('%cHold Up!', 'font-size:50pt;color:red')
    console.log(
      '%cIf someone told you to copy/paste something here you have an 11/10 chance you are being scammed.',
      'font-size:15pt;color:red'
    )
    console.log()
  })

  return <Component {...pageProps} />
}
