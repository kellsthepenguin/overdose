import ChatProfile from '@/components/ChatProfile'
import Topbar from '@/components/TopBar'
import Bubble from '@/components/Bubble'
import useSWR from 'swr'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import ChatInput from '@/components/ChatInput'
import { Buffer } from 'buffer'

interface User {
  id: string
  name: string
  encodedPublicKey: string
}

const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

export default function Chat() {
  const { data, error, isLoading } = useSWR('/api/relations', (url) =>
    fetcher(url, localStorage.getItem('token')!)
  )

  if (error) {
    console.log(error)
    alert('오류가 발생했습니다.')
    location.href = '/'
  }

  if (isLoading) return '로딩..'

  if (!data.ok) {
    alert('만료된 토큰입니다.')
    location.href = '/'
  }

  return <AfterEarlyReturn data={data} />
}

const AfterEarlyReturn = ({ data }: { data: any }) => {
  const [currentChatProfileElement, setCurrentChatProfileElement] =
    useState<HTMLDivElement | null>(null)
  const [isOpened, setIsOpened] = useState(true)
  const [currentFriend, setCurrentFriend] = useState<User | null>(null)
  const chatProfiles: JSX.Element[] = []

  if (typeof window !== 'undefined') {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight}px`
      )
    }
    window.addEventListener('resize', setVh)
    setVh()
  }

  useEffect(() => {
    const friends = data.seconds as User[]
    const childrens = Array.from(
      document.getElementsByClassName('chat-profile')
    )
    const profileElem = childrens.find(
      (elem) => elem.getAttribute('data-id') === currentFriend?.id
    )

    currentChatProfileElement?.classList.remove('bg-gray-100')
    profileElem?.classList.add('bg-gray-100')
    setCurrentChatProfileElement(profileElem as HTMLDivElement)
    const friend = friends.find((user) => user.id === currentFriend?.id)!
    if (friend === undefined) return
    setCurrentFriend(friend)
  }, [currentFriend])

  const friends = data.seconds as User[]

  friends.forEach((user) => {
    chatProfiles.push(
      <ChatProfile
        name={user.name}
        id={user.id}
        onClick={() => setCurrentFriend(user)}
        key={user.id}
      />
    )
  })

  return (
    <div>
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
          {chatProfiles}
        </div>
        <div className='flex flex-col-reverse h-[calc(var(--vh)-64px)] w-screen overflow-scroll'>
          <ChatInput
            name={currentFriend?.name ? currentFriend?.name : ''}
            id={currentFriend?.id ? currentFriend?.id : '...'}
          />
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
    </div>
  )
}
