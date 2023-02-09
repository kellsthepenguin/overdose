// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/prisma'
import { sha256 } from 'js-sha256'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, pw, name }: {
    id: string,
    pw: string,
    name: string
  } = req.body
  const salt = nanoid(36)

  if (id && pw && name) {
    const idRegexp = /^\w+$/
    const pwRegexp = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/

    if (!id.match(idRegexp) || !pw.match(pwRegexp)) {
      return res.json({ ok: false, error: 'invalid id or pw' })
    }

    await prisma.user.create({
      data: {
        id,
        pw: sha256(pw + salt),
        salt,
        name
      }
    }).then(() => res.json({ ok: true }))
      .catch((err) => {
        console.log(err)
        res.json({ ok: false, error: 'db error' })
      })
  } else {
    res.json({ ok: false, error: 'invalid body' })
  }
}
