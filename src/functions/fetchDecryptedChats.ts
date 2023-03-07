import IChat from '@/types/IChat'
import decryptChat from './decryptChat'

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
    decryptedChats.push(await decryptChat(chat))
  }

  return decryptedChats
}
