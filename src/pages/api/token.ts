import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'
import prisma from '@/prisma'
import { sha256 } from 'js-sha256'

const key = readFileSync('private.key').toString('utf-8')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, pw } = req.body
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (user?.pw === sha256(pw + user?.salt)) {
    const token = jwt.sign({ id, name: user.name }, key)

    res.json({ ok: true, token })
  } else {
    res.json({ ok: false, error: 'wrong password or id' })
  }
}
