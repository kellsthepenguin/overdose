import { Router } from 'express'

const router = Router()

router.get('/new', (req, res) => {
  res.json({ fuck: 'u' })
})

export default router
