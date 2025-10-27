import connect from '../../../lib/mongodb'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import { signToken } from '../../../lib/auth'
import cookie from 'cookie'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  await connect()
  const { name, email, password, role } = req.body
  if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' })
  const existing = await User.findOne({ email })
  if (existing) return res.status(409).json({ error: 'Email already in use' })
  const hashed = await bcrypt.hash(password, 10)
  const user = new User({ name, email, password: hashed, role: role || 'student' })
  await user.save()
  const token = signToken({ id: user._id })
  res.setHeader('Set-Cookie', cookie.serialize('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 }))
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } })
}
