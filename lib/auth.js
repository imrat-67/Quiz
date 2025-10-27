import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import User from '../models/User'
import connect from './mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export async function getUserFromRequest(req) {
  // ensure connection
  await connect()
  const cookies = req.cookies || (req.headers.cookie ? cookie.parse(req.headers.cookie) : {})
  const token = cookies.token
  if (!token) return null
  try {
    const data = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(data.id).select('-password').lean()
    return user
  } catch (err) {
    return null
  }
}
