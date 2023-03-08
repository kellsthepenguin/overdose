import Center from '@/components/Center'
import Input from '@/components/Input'
import PrimaryButton from '@/components/PrimaryButton'
import Topbar from '@/components/TopBar'
import { useRef } from 'react'

export default function Login() {
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)

  const handleLogin = () => {
    const id = idRef.current?.value
    const pw = pwRef.current?.value

    fetch('/api/token', {
      method: 'POST',
      body: JSON.stringify({ id, pw }),
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
          <p>아이디</p>
          <Input innerRef={idRef} placeholder='dandelions' type='text' />
          <p>비밀번호</p>
          <Input
            className='mb-2'
            innerRef={pwRef}
            placeholder='PaSs!w$0%^d&'
            type='password'
          />
          <PrimaryButton onClick={handleLogin}>로그인</PrimaryButton>
        </div>
      </Center>
    </div>
  )
}
