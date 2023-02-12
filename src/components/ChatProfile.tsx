export default function ChatProfile({
  name,
  recentChat,
  id,
  onClick,
}: {
  name: string
  recentChat: string
  id: string
  onClick: () => void
}) {
  return (
    <div
      className={`flex gap-3 hover:bg-slate-100 p-4 pr-0 border-b-2 cursor-default chat-profile`}
      onClick={onClick}
      data-id={id}
    >
      <div className='flex flex-col gap-2'>
        <span className='font-bold text-lg'>
          {name} <span className='font-normal text-base'>({id})</span>
        </span>
        <p className='text-slate-400'>{recentChat}</p>
      </div>
    </div>
  )
}
