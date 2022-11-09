import { Router } from 'express'
import fetch from 'node-fetch'

const router = Router()

router.post('/new', (req, res) => {
  const { captcha, name } = req.body

  fetch('https://hcaptcha.com/siteverify', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'response': captcha,
      'secret': process.env.HCAPTCHA_SECRET!
    })
  }).then((r) => r.json()).then((json) => res.json(json))
})

export default router
