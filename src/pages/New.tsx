import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useEffect } from 'react'
import { render } from 'react-dom'
import Topbar from '../components/Topbar'

export default function Captcha() {
  const handleVerificationSuccess = (token: string, ekey: string) => {
    setTimeout(() => render(<New token={token} ekey={ekey} />, document.getElementById('root') as HTMLElement), 1000)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      location.href = location.origin + '/chat'
    }
  })

  return (
    <div>
      <Topbar />
      { /* className='' 가운데 정렬 알아서 */ }
      <HCaptcha
        sitekey='69a2045d-3b8e-408d-b9f4-d034d5858703'
        onVerify={handleVerificationSuccess}
      />
    </div>
  )
}

function New ({ token, ekey }: { token: string, ekey: string }) {
  return (
    <div>
      <Topbar />
    </div>
  )
}