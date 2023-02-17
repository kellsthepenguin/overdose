import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ChatProfile({
  name,
  id,
  onClick,
}: {
  name: string
  id: string
  onClick: () => void
}) {
  return (
    <div
      className={`flex gap-3 hover:bg-slate-100 p-4 pr-0 border-b-2 cursor-default chat-profile`}
      onClick={onClick}
      data-id={id}
    >
      <div className='flex flex-row py-2 px-1 gap-3 items-center'>
        <FontAwesomeIcon icon={faCircleUser} size='2x' />
        <span className='font-bold text-lg'>
          {name} <span className='font-normal text-base'>({id})</span>
        </span>
      </div>
    </div>
  )
}
