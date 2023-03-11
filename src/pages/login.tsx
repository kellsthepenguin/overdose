import Center from '@/components/Center'
import Input from '@/components/Input'
import PrimaryButton from '@/components/PrimaryButton'
import Topbar from '@/components/TopBar'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { FormEvent, useRef, useState } from 'react'

export default function Login() {
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const [captcha, setCaptcha] = useState('')

  const handleLogin = (e: FormEvent) => {
    e.preventDefault() // prevent from browser refreshing page
    const id = idRef.current?.value
    const pw = pwRef.current?.value

    fetch('/api/token', {
      method: 'POST',
      body: JSON.stringify({ id, pw, captcha }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.ok === true) {
          alert('성공적으로 로그인하였습니다.')
          localStorage.setItem('token', result.token)
          location.href = '/chat'
        } else {
          alert('로그인에 실패했습니다. 오류: ' + result.error)
        }
      })
  }

  return (
    <div>
      <Topbar />
      <Center>
        <div className='px-[8vw] sm:px-[16vw] py-[calc(24vh-64px)] bg-slate-100 rounded-md'>
          <form onSubmit={handleLogin} id='login'>
            <p>아이디</p>
            <Input innerRef={idRef} placeholder='dandelions' type='text' />
            <p>비밀번호</p>
            <Input
              className='mb-2'
              innerRef={pwRef}
              placeholder='PaSs!w$0%^d&'
              type='password'
            />
            <HCaptcha
              sitekey='5b7cce4c-90dc-4340-8280-6bdcb05d4578'
              onVerify={(token) => setCaptcha(token)}
            />
            <PrimaryButton form='login'>로그인</PrimaryButton>
          </form>
        </div>
      </Center>
    </div>
  )
}
