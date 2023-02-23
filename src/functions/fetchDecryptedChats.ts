import eccrypto from 'eccrypto'

interface IChat {
  authorId: string
  date: string
  author: {
    name: string
  }
  text: string
  textForSender: string | undefined
}

export default async function fetchDecryptedChats(
  token: string,
  friendId: string
) {
  const encryptedChats: IChat[] = await fetch('/api/chats/' + friendId, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json())
  const decryptedChats: IChat[] = []

  for await (const chat of encryptedChats) {
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

    decryptedChats.push(chat)
  }

  return decryptedChats
}
