import ChatProfile from '@/components/ChatProfile'
import Topbar from '@/components/TopBar'
import Bubble from '@/components/Bubble'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAdd,
  faArrowLeft,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import ChatInput from '@/components/ChatInput'
import fetchDecryptedChats from '@/functions/fetchDecryptedChats'
import { nanoid } from 'nanoid'
import IUser from '@/types/IUser'
import sendMessage from '@/functions/sendMessage'
import IChat from '@/types/IChat'
import ScrollToBottom from 'react-scroll-to-bottom'
import { io } from 'socket.io-client'
import decryptChat from '@/functions/decryptChat'
import useRelations from '@/hooks/useRelations'

export default function Chat() {
  const { data, error, isLoading } = useRelations()

  if (error) {
    console.log(error)
    alert('오류가 발생했습니다.')
    location.href = '/'
    return ''
  }

  if (isLoading) return '로딩..'

  if (!data.ok) {
    alert('만료된 토큰입니다.')
    location.href = '/'
    return ''
  }

  return <AfterEarlyReturn data={data} />
}

const AfterEarlyReturn = ({ data }: { data: any }) => {
  const [currentChatProfileElement, setCurrentChatProfileElement] =
    useState<HTMLDivElement | null>(null)
  const [isOpened, setIsOpened] = useState(true)
  const [currentFriend, setCurrentFriend] = useState<IUser | null>(null)
  const chatProfiles: JSX.Element[] = []
  const [chats, setChats] = useState<IChat[]>([])
  const chatInput = useRef<HTMLInputElement>(null)
  const token = localStorage.getItem('token')!

  useEffect(() => {
    const socket = io({
      path: '/api/socket.io',
      extraHeaders: {
        authorization: token,
      },
    })

    socket.on('msg', async (chat) => {
      const decryptedChat = await decryptChat(chat)
      setChats((chats) => [...chats, decryptedChat])
    })
  }, [])

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
    fetchDecryptedChats(token, friend.id).then((chats) => {
      setChats([...chats.reverse()])
    })
  }, [currentFriend])

  const onSendTriggered = () => {
    sendMessage(
      token,
      chatInput.current!.value,
      currentFriend!,
      localStorage.getItem('encodedPrivateKey')!
    ).then(({ ok, chat }) => {
      if (!ok) {
        alert('an error occured while sending message')
        return
      }

      setChats((chats) => [...chats, chat])
      chatInput.current!.value = ''
    })
  }

  const showAddFriendDialog = async () => {
    const friendId = prompt('추가할 아이디를 입력해주세요')
    if (!friendId) return
    const result = await (
      await fetch('/api/relations', {
        method: 'POST',
        body: JSON.stringify({ secondId: friendId }),
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
    ).json()

    if (result.ok) {
      alert('성공적으로 친구를 추가했습니다.')
    } else {
      alert(result.error)
    }
  }

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
          <div className='py-2 pl-4 sticky self-start top-0 bg-white w-[100vw-320px] border-b-2 flex'>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size='xl'
              onClick={() => setIsOpened(false)}
            />
            <FontAwesomeIcon
              className='ml-auto mr-2'
              icon={faAdd}
              size='xl'
              onClick={showAddFriendDialog}
            />
          </div>
          {chatProfiles}
        </div>
        {currentFriend && (
          <>
            <div className='flex flex-col flex-1 h-[calc(var(--vh)-64px)] w-[100vw-320px]'>
              <div className='absolute bottom-[calc(var(--vh)-95px)] w-[100vw-320px] bg-white h-8 mb-[3px] flex items-center'>
                <div
                  className={`bottom-[calc(var(--vh)-95px)] ml-[16px] mt-[8px] ${
                    isOpened ? 'hidden' : ''
                  }`}
                  onClick={() => setIsOpened(true)}
                >
                  <FontAwesomeIcon icon={faUserGroup} />
                </div>
              </div>
              <div className='h-[calc(100vh-148px)] flex justify-end flex-col'>
                <Bubble date={''} name={''} text={''} key={nanoid()} />
                <ScrollToBottom className='mt-auto overflow-scroll'>
                  {chats.map((chat) => (
                    <Bubble
                      date={Intl.DateTimeFormat(navigator.language, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(new Date(chat.date))}
                      name={chat.author.name}
                      text={chat.text}
                      key={nanoid()}
                    />
                  ))}
                </ScrollToBottom>
              </div>
              <ChatInput
                name={currentFriend.name}
                id={currentFriend.id}
                innerRef={chatInput}
                onSendTriggered={onSendTriggered}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
