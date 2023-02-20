import ChatProfile from '@/components/ChatProfile'
import Topbar from '@/components/TopBar'
import Bubble from '@/components/Bubble'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import ChatInput from '@/components/ChatInput'
import { Buffer } from 'buffer'
import eccrypto from 'eccrypto'
import { nanoid } from 'nanoid'
import useSyncState from '@/util/useSyncState'

interface IUser {
  id: string
  name: string
  encodedPublicKey: string
}

interface IChat {
  authorId: string
  date: string
  author: {
    name: string
  }
  text: string
  textForSender: string
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
  const [currentFriend, setCurrentFriend] = useState<IUser | null>(null)
  const chatProfiles: JSX.Element[] = []
  const [getChatElements, setChatElements] = useSyncState<JSX.Element[]>([])

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
    const friends = data.seconds as IUser[]
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
    fetch('/api/chats/' + friend.id, {
      headers: {
        Authorization: localStorage.getItem('token')!,
      },
    })
      .then((res) => res.json())
      .then((chats: IChat[]) => {
        setChatElements([])
        chats.forEach((chat) => {
          const privateKey = Buffer.from(
            localStorage.getItem('encodedPrivateKey')!,
            'base64'
          )
          const ecies = JSON.parse(
            Buffer.from(
              chat.authorId ===
                JSON.parse(
                  Buffer.from(
                    localStorage.getItem('token')?.split('.')[1] as string,
                    'base64'
                  ).toString('utf-8')
                ).id
                ? Buffer.from(chat.textForSender, 'base64').toString()
                : Buffer.from(chat.text, 'base64').toString()
            ).toString()
          )
          Object.keys(ecies).forEach((key) => {
            ecies[key] = Buffer.from(ecies[key].data)
          })
          eccrypto.decrypt(privateKey, ecies).then((buff) => {
            setChatElements([
              ...getChatElements(),
              <Bubble
                date={new Date(Date.parse(chat.date)).toLocaleDateString()}
                name={chat.author.name}
                text={buff.toString()}
                key={nanoid()}
              />,
            ])
          })
        })
      })
  }, [currentFriend])

  const friends = data.seconds as IUser[]

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
          className={`self-start flex-col h-[calc(var(--vh)-64px)] w-80 border-r-2 overflow-scroll ${
            !isOpened ? 'hidden' : ''
          }`}
          id='profiles'
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
        {currentFriend && (
          <>
            <div className='flex flex-col-reverse h-[calc(var(--vh)-64px)] w-screen overflow-scroll'>
              <ChatInput name={currentFriend.name} id={currentFriend.id} />
              {getChatElements()}
              <div className='sm:hidden absolute bottom-[calc(var(--vh)-95px)] w-full bg-white h-7 mb-[3px]'>
                <div
                  className={`absolute bottom-[calc(var(--vh)-95px)] left-4 ${
                    isOpened ? 'hidden' : ''
                  }`}
                  onClick={() => setIsOpened(true)}
                >
                  <FontAwesomeIcon icon={faUserGroup} />
                </div>
              </div>
              <div
                className={`absolute bottom-[calc(var(--vh)-95px)] left-4 sm:hidden ${
                  isOpened ? 'hidden' : ''
                }`}
                onClick={() => setIsOpened(true)}
              >
                <FontAwesomeIcon icon={faUserGroup} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
