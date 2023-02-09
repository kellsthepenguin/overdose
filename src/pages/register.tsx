import Center from '@/components/Center'
import Input from '@/components/Input'
import PrimaryButton from '@/components/PrimaryButton'
import Topbar from '@/components/TopBar'
import { useRef } from 'react'

export default function Register() {
  const nameRef = useRef<HTMLInputElement>(null)
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)

  const handleRegister = () => {
    const name = nameRef.current?.value
    const id = idRef.current?.value
    const pw = pwRef.current?.value

    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ name, id, pw }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((result) => {
        if (result.ok === true) {
          alert('성공적으로 계정을 생성하였습니다!')
        } else {
          alert('계정 생성에 실패했습니다. 오류: ' + result.error)
        }
      })
  }

  return (
    <div>
      <Topbar />
      <Center>
        <div className='px-[16vw] py-[calc(24vh-64px)] bg-slate-100 rounded-md'>
          <p>이름</p>
          <Input innerRef={nameRef} placeholder='John Doe' type='text' />
          <p>아이디</p>
          <Input innerRef={idRef} placeholder='dandelions' type='text' />
          <p>비밀번호</p>
          <Input className='mb-2' innerRef={pwRef} placeholder='PaSs!w$0%^d&' type='password' /> 
          <PrimaryButton onClick={handleRegister}>회원가입</PrimaryButton>
        </div>
      </Center>
    </div>
  )
}
