import IChat from '@/types/IChat'
import eccrypto from 'eccrypto'

export default async function decryptChat(chat: IChat) {
  const privateKey = Buffer.from(
    localStorage.getItem('encodedPrivateKey')!,
    'base64'
  )
  const ecies = JSON.parse(
    Buffer.from(
      chat.authorId ===
        JSON.parse(
          Buffer.from(
            localStorage.getItem('token')?.split('.')[1] as string,
            'base64'
          ).toString('utf-8')
        ).id
        ? Buffer.from(chat.textForSender!, 'base64').toString()
        : Buffer.from(chat.text, 'base64').toString()
    ).toString()
  )
  Object.keys(ecies).forEach((key) => {
    ecies[key] = Buffer.from(ecies[key].data)
  })

  const text = (await eccrypto.decrypt(privateKey, ecies)).toString()
  chat.text = text
  delete chat.textForSender

  return chat
}
