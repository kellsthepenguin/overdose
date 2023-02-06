import PrimaryButton from '@/components/PrimaryButton'
import Topbar from '@/components/TopBar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div>
      <div>
      <Topbar />
      <div className='absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 text-left'>
        <div className='flex row gap-7 items-center'>
          <img src='/logo.svg' height={128} width={128}/>
          <div>
            <p className='font-xl'>당신의 대화는 보호받아야 하니까.</p>
            <p className='text-5xl font-bold font-mono pb-2'>Overdose.</p>
            <PrimaryButton href='/new'>
              시작하기 &nbsp; 
              <FontAwesomeIcon icon={faChevronRight} />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
