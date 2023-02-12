export default function Chat({
  date,
  name,
  text,
}: {
  date: string
  name: string
  text: string
}) {
  return (
    <div className='ml-5 flex items-center text-lg'>
      <span className='text-sm'>{date}</span>
      <span className='font-bold ml-2'>&nbsp;{name}</span>
      <span className='ml-2'>&nbsp;{text}</span>
    </div>
  )
}
