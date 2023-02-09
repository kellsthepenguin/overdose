import { PropsWithChildren } from 'react'

export default function Center({ children }: PropsWithChildren) {
  return (
    <div className='absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2'>
      {children}
    </div>
  )
}
