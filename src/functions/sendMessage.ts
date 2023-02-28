import IChat from '@/types/IChat'
import IUser from '@/types/IUser'
import eccrypto from 'eccrypto'

export default async function sendMessage(
  token: string,
  message: string,
  friend: IUser,
  myEncodedPrivateKey: string
): Promise<{ ok: boolean; chat: IChat }> {
  const friendPublicKey = Buffer.from(friend.encodedPublicKey, 'base64')
  const myPrivateKey = Buffer.from(myEncodedPrivateKey, 'base64')
  const myPublicKey = eccrypto.getPublic(myPrivateKey)
  const messageBuffer = Buffer.from(message)
  const ecies = await eccrypto.encrypt(friendPublicKey, messageBuffer)
  const myEcies = await eccrypto.encrypt(myPublicKey, messageBuffer)

  const result = await fetch('/api/chats/' + friend.id, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: Buffer.from(JSON.stringify(ecies)).toString('base64'),
      textForSender: Buffer.from(JSON.stringify(myEcies)).toString('base64'),
    }),
  }).then((res) => res.json())

  result.chat.text = message

  return result
}
