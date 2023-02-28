import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MutableRefObject } from 'react'
import Input from './Input'

export default function ChatInput({
  name,
  id,
  innerRef,
  onSendTriggered,
}: {
  name: string
  id: string
  innerRef: MutableRefObject<HTMLInputElement | null>
  onSendTriggered: () => void
}) {
  if (typeof window !== 'undefined') {
    const chatInput = document.getElementById('chatInput')

    chatInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.stopImmediatePropagation()
        if (e.repeat) return
        onSendTriggered()
      }
    })
  }

  return (
    <div className='p-5 flex gap-2 items-center w-full'>
      <Input
        placeholder={`Send chat to ${name}(${id})`}
        type='text'
        id='chatInput'
        className='relative w-full inline'
        innerRef={innerRef}
      />
      <div className='max-sm:mx-[5%]' onClick={onSendTriggered}>
        <FontAwesomeIcon
          icon={faPaperPlane}
          className='w-[25px] h-[25px] sm:hidden'
          color='#3b82f6'
        />
      </div>
    </div>
  )
}
