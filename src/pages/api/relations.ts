import prisma from '@/prisma'
import { verifyJWT } from '@/util'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization: token } = req.headers as { authorization: string }
  const isValid = verifyJWT(token)

  if (!isValid) return res.json({ ok: false, error: 'invalid token' })

  const { id } = jwt.decode(token) as { id: string }

  if (req.method === 'GET') {
    const relations = await prisma.relations.findMany({
      where: {
        firstId: id,
      },
      include: {
        second: true,
      },
    })
    const seconds = relations.map((relation) => relation.second)

    res.json({ ok: true, seconds })
  } else if (req.method === 'POST') {
    const { secondId } = req.body
    const second = await prisma.user.findUnique({
      where: {
        id: secondId,
      },
    })

    if (!second) return res.json({ ok: false, error: "user doesn't exists" })
    if (id === secondId)
      return res.json({
        ok: false,
        error: 'You are the forever friend of you.', // 당신은 당신의 영원한 친구입니다.
      })

    const relation = await prisma.relations.findFirst({
      where: {
        firstId: id,
        secondId,
      },
    })

    if (relation)
      return res.json({ ok: false, error: 'relation already exists' })

    try {
      await prisma.relations.create({
        data: {
          firstId: id,
          secondId,
        },
      })

      await prisma.relations.create({
        data: {
          firstId: secondId,
          secondId: id,
        },
      })

      res.json({ ok: true })
    } catch (err) {
      console.log(err)
      res.json({ ok: false, error: 'an error occurred' })
    }
  }
}
