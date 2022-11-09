import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useEffect } from 'react'
import { render } from 'react-dom'
import Topbar from '../components/Topbar'

export default function Captcha() {
  const handleVerificationSuccess = (token: string) => {
    setTimeout(() => render(<New token={token} />, document.getElementById('root') as HTMLElement), 1000)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      location.href = location.origin + '/chat'
    }
  })

  return (
    <div>
      <Topbar />
      <div className='-translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 absolute'>
        <HCaptcha
          sitekey='69a2045d-3b8e-408d-b9f4-d034d5858703'
          onVerify={handleVerificationSuccess}
        />
      </div>
    </div>
  )
}

function New ({ token }: { token: string }) {
  useEffect(() => {
    fetch('/api/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ captcha: token })
    }).then((res) => res.json()).then(console.log)
  })

  return (
    <div>
      <Topbar />
    </div>
  )
}