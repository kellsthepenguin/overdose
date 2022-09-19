import Topbar from './components/Topbar'
import img from './assets/solid-color-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function App() {
  return (
    <div>
      <Topbar />
      <div className='absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 text-left'>
        <div className='flex row gap-7 items-center'>
          <div>
            <p className='font-xl'>당신의 대화는 보호받아야 하니까.</p>
            <p className='text-5xl font-bold font-mono pb-2'>Overdose.</p>
            <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2m focus:outline-none'>
              시작하기 &nbsp;
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <img src={img} height={256} width={256}/> { /* some picture */ }
        </div>
      </div>
    </div>
  )
}
