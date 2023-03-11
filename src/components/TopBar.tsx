export default function Topbar() {
  return (
    <div className='flex-1 flex flex-col'>
      <nav className='px-4 flex justify-between bg-white h-16 border-b-2 z-50'>
        <ul className='flex items-center'>
          <li>
            <a className='font-bold font-mono' href='/'>
              Overdose
            </a>
          </li>
        </ul>

        <ul className='flex items-center'>
          <li>
            <a className='text-blue-500 font-bold' href='/login'>
              로그인
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
