import prisma from '@/prisma'
import verifyJWT from '../../../util/verifyJWT'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization: token } = req.headers as { authorization: string }
  const isValid = verifyJWT(token)
  const { id: targetId } = req.query as { id: string }
  const { id: myId } = jwt.decode(token) as { id: string }

  if (!isValid) return res.json({ ok: false, error: 'invalid token' })

  if (req.method === 'GET') {
    const chats = await prisma.chats.findMany({
      take: 100,
      orderBy: {
        id: 'desc',
      },
      where: {
        OR: [{ authorId: targetId }, { receiverId: targetId }],
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    res.json(chats)
  } else if (req.method === 'POST') {
    const { text, textForSender } = req.body

    if (!text || !textForSender)
      return res.json({ ok: false, error: 'invalid body' })
    if (myId === targetId)
      return res.json({ ok: false, error: 'cannot send message to self' })

    try {
      const chat = await prisma.chats.create({
        data: {
          authorId: myId,
          receiverId: targetId,
          text,
          textForSender,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      })

      res.json({ ok: true, chat })
    } catch (e) {
      res.json({ ok: false, error: 'db error' })
    }
  }
}
