import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'

const key = readFileSync('private.key').toString('utf-8')

export default function verifyJWT(token: string) {
  try {
    jwt.verify(token, key)
    return true
  } catch (_) {
    return false
  }
}
