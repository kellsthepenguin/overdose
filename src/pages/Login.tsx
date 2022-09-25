import PrimaryButton from '../components/PrimaryButton'
import Topbar from '../components/Topbar'

export default function Login() {
  return (
    <div>
      <Topbar />
      <div className='absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 text-left'>
        <p className='md:text-4xl text-2xl font-bold'>로그인</p>
        <label htmlFor='token'>토큰</label>
        <input id='token' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 p-2 mb-1.5' placeholder=' iQZDyyWeifgOHxirRYxH4ZIqKBfrMb' size={35} autoComplete='off' />
        <PrimaryButton>로그인</PrimaryButton>
      </div>
    </div>
  )
}
