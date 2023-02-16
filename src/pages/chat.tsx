import ChatProfile from '@/components/ChatProfile'
import Topbar from '@/components/TopBar'
import Bubble from '@/components/Bubble'
import useSWR from 'swr'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import ChatInput from '@/components/ChatInput'

const fetcher = (url: string, body: any) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

export default function Chat() {
  const { data, error, isLoading } = useSWR('/api/verify', (url) =>
    fetcher(url, { token: localStorage.getItem('token') })
  )
  const isFirstRender = useRef(true)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [currentChatProfileElement, setCurrentChatProfileElement] =
    useState<HTMLDivElement | null>(null)
  const [isOpened, setIsOpened] = useState(true)

  if (typeof window !== 'undefined') {
    // fix safari 100vh problem
    const setAppHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--vh', `${window.innerHeight}px`)
    }

    window.addEventListener('resize', setAppHeight)
    setAppHeight()
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const childrens = Array.from(
      document.getElementsByClassName('chat-profile')
    )
    const profileElem = childrens.find(
      (elem) => elem.getAttribute('data-id') === currentChatId
    )

    currentChatProfileElement?.classList.remove('bg-gray-100')
    profileElem?.classList.add('bg-gray-100')
    setCurrentChatProfileElement(profileElem as HTMLDivElement)
  }, [currentChatId])

  if (error) {
    console.log(error)
    return '오류가 발생했습니다.'
  }
  if (isLoading) return '로딩..'
  if (!data.valid) {
    alert('만료된 토큰입니다.')
    location.href = '/'
    return
  }

  return (
    <>
      <Topbar />
      <div className='flex'>
        <div
          className={`flex flex-col h-[calc(var(--vh)-64px)] w-80 border-r-2 overflow-scroll ${
            !isOpened ? 'hidden' : ''
          }`}
        >
          <div className='sm:hidden py-2 pl-4 sticky self-start top-0 bg-white w-[100%] border-b-2'>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size='xl'
              onClick={() => setIsOpened(false)}
            />
          </div>
          <ChatProfile
            name='John Doe'
            recentChat='Hello world!'
            id='johndoe123'
            onClick={() => setCurrentChatId('johndoe123')}
          />
          <ChatProfile
            name='John Doe'
            recentChat='Hello world!'
            id='johndoe1234'
            onClick={() => setCurrentChatId('johndoe1234')}
          />
        </div>
        <div className='flex flex-col-reverse h-[calc(var(--vh)-64px)] w-screen overflow-scroll'>
          <ChatInput name='John Doe' id='johndoe123' />
          <Bubble date='오전 7:21' name='John Doe' text='Hello World!' />
          <div
            className={`absolute bottom-[calc(var(--vh)-95px)] left-4 sm:hidden ${
              isOpened ? 'hidden' : ''
            }`}
            onClick={() => setIsOpened(true)}
          >
            <FontAwesomeIcon icon={faUserGroup} />
          </div>
        </div>
      </div>
    </>
  )
}
