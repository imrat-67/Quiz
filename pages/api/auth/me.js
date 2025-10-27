import { getUserFromRequest } from '../../../lib/auth'
import connect from '../../../lib/mongodb'

export default async function handler(req, res) {
  await connect()
  const user = await getUserFromRequest(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  res.json({ user })
}
