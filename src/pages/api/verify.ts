import type { NextApiRequest, NextApiResponse } from 'next'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { readFileSync } from 'fs'

const key = readFileSync('private.key').toString('utf-8')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body

  jwt.verify(token, key, (error: VerifyErrors | null) => {
    if (!error) {
      res.json({ valid: true })
    } else {
      res.json({ valid: false })
    }
  })
}
