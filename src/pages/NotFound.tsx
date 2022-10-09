import Topbar from '../components/Topbar'

export default function NotFound() {
  return (
    <div>
      <Topbar />
      <div className='absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 text-left'>
        <p className='text-4xl font-bold'>404</p>
        <p className='text-xl pb-[5px]'>길을 잃으셨군요! 하지만 괜찮아요.</p>
        <a href='/' className='text-blue-500 font-bold'>메인페이지로 돌아가기</a>
      </div>
    </div>
  )
}
