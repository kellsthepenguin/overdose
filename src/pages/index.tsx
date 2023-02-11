import PrimaryButton from '@/components/PrimaryButton'
import Topbar from '@/components/TopBar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Center from '@/components/Center'

export default function Home() {
  return (
    <>
      <Topbar />
      <Center>
        <div className='flex row gap-7 items-center pr-32 sm:pr-0'>
          <img src='/logo.svg' height={128} width={128} />
          <div>
            <p className='text-sm sm:text-base'>
              당신의 대화는 보호받아야 하니까.
            </p>
            <p className='text-3xl sm:text-5xl font-bold font-mono pb-2'>
              Overdose.
            </p>
            <PrimaryButton onClick={() => (location.href = '/register')}>
              시작하기 &nbsp;
              <FontAwesomeIcon icon={faChevronRight} />
            </PrimaryButton>
          </div>
        </div>
      </Center>
    </>
  )
}
