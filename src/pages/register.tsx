import Center from '@/components/Center'
import Input from '@/components/Input'
import PrimaryButton from '@/components/PrimaryButton'
import Topbar from '@/components/TopBar'
import { FormEvent, useRef, useState } from 'react'
import eccrypto from 'eccrypto'
import HCaptcha from '@hcaptcha/react-hcaptcha'

export default function Register() {
  const nameRef = useRef<HTMLInputElement>(null)
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const agreeRef = useRef<HTMLInputElement>(null)
  const [captcha, setCaptcha] = useState('')

  const handleRegister = (e: FormEvent) => {
    e.preventDefault() // prevent from browser refreshing page
    const name = nameRef.current?.value
    const id = idRef.current?.value
    const pw = pwRef.current?.value
    const isAgreed = agreeRef.current?.checked

    const privateKey = eccrypto.generatePrivate()
    const publicKey = eccrypto.getPublic(privateKey)
    const encodedPrivateKey = privateKey.toString('base64')
    const encodedPublicKey = publicKey.toString('base64')

    if (!isAgreed) {
      alert('You should agree to privacy policy.')
      return
    }

    if (!captcha) {
      alert('Invalid captcha')
      return
    }

    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ name, id, pw, encodedPublicKey, captcha }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.ok === true) {
          localStorage.setItem('encodedPrivateKey', encodedPrivateKey)
          alert('성공적으로 계정을 생성하였습니다!')
          location.href = '/login'
        } else {
          alert('계정 생성에 실패했습니다. 오류: ' + result.error)
        }
      })
  }

  return (
    <div>
      <Topbar />
      <Center>
        <div className='px-[8vw] sm:px-[16vw] py-[calc(24vh-64px)] bg-slate-100 rounded-md'>
          <form onSubmit={handleRegister} id='register'>
            <p>이름</p>
            <Input innerRef={nameRef} placeholder='John Doe' type='text' />
            <p>아이디</p>
            <Input innerRef={idRef} placeholder='dandelions' type='text' />
            <p>비밀번호</p>
            <Input
              innerRef={pwRef}
              placeholder='PaSs!w$0%^d&'
              type='password'
            />
            <Input
              className='inline mr-2'
              innerRef={agreeRef}
              id='agree'
              type='checkbox'
            />
            <label htmlFor='agree' className='inline'>
              I agree{' '}
              <p
                onClick={() =>
                  window.open(
                    'https://overdos3.notion.site/Privacy-Policy-f33c07f947c147aca847aef9c0a19158',
                    '_blank'
                  )
                }
                className='text-blue-600 inline cursor-pointer'
              >
                Privacy Policy
              </p>
            </label>
            <HCaptcha
              sitekey='5b7cce4c-90dc-4340-8280-6bdcb05d4578'
              onVerify={(token) => setCaptcha(token)}
            />
            <PrimaryButton form='register'>회원가입</PrimaryButton>
          </form>
        </div>
      </Center>
    </div>
  )
}
