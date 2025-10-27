import connect from '../../../lib/mongodb'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import { signToken } from '../../../lib/auth'
import cookie from 'cookie'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  await connect()
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const token = signToken({ id: user._id })
  res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 }))
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } })
}
