import { MutableRefObject } from 'react'

export default function Input({
  innerRef,
  className,
  placeholder,
  id,
  type,
}: {
  innerRef?: MutableRefObject<HTMLInputElement | null>
  className?: string
  placeholder?: string
  id?: string
  type: string
}) {
  return (
    <input
      ref={innerRef}
      className={
        'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 p-2 mb-1.5 ' +
        className
      }
      id={id}
      placeholder={placeholder}
      size={35}
      autoComplete='off'
      type={type}
    />
  )
}
