import { FC, PropsWithChildren } from 'react'

const PrimaryButton: FC<PropsWithChildren<{ href: string }>> = ({ children, href }: PropsWithChildren<{ href: string }>) => {
  return (
    <a href={href} className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2m focus:outline-none'>
      {children}
    </a>
  )
}

export default PrimaryButton
