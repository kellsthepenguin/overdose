import { FC, PropsWithChildren } from 'react'

export default function PrimaryButton({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <a className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2m focus:outline-none cursor-default' onClick={onClick}>
      {children}
    </a>
  )
}
