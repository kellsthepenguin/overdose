import prisma from '@/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string }
  const user = (await prisma.user.findUnique({
    where: {
      id,
    },
  })) as any

  if (!user) {
    res.json({ ok: false, error: "user dosen't exists" })
    return
  }

  delete user.pw
  delete user.salt

  res.json({ ok: true, user })
}
