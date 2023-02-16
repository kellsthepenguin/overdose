import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from './Input'

export default function ChatInput({ name, id }: { name: string; id: string }) {
  return (
    <div className='p-5 flex gap-2 items-center w-full'>
      <Input
        placeholder={`Send chat to ${name}(${id})`}
        type='text'
        className='relative w-full inline'
      />
      <div className='max-sm:mx-[5%]'>
        <FontAwesomeIcon
          icon={faPaperPlane}
          className='w-[25px] h-[25px] sm:hidden'
          color='#3b82f6'
        />
      </div>
    </div>
  )
}
