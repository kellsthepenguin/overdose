import prisma from '../prisma'
import { Router } from 'express'
import fetch from 'node-fetch'
import { generateString } from '../util'
import { generateSlug } from 'random-word-slugs'

const router = Router()

router.post('/new', async (req, res) => {
  const { captcha, type, name } = req.body

  const result = await fetch('https://hcaptcha.com/siteverify', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'response': captcha,
      'secret': process.env.HCAPTCHA_SECRET!
    })
  }).then((r) => r.json())

  if (result.isSuccess) {
    if (type !== 'cr' || type !== 'mr') {
      return res.status(500).json({
        ok: false,
        reason: 'invalid type'
      })
    }

    prisma.user.create({
      data: {
        key: type === 'cr' ? generateString(30) : generateSlug(5, { format: 'title' }).replaceAll(' ', ''),
        name
      }
    }).then((user) => {
      res.json(user)
    }).catch((err) => {
      res.status(500).json({ ok: false, reason: 'server error' })
      console.log(err)
    })
  }
})

export default router
