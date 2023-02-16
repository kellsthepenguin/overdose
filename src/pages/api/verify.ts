import { verifyJWT } from '@/util'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body

  res.json({ valid: verifyJWT(token) })
}
