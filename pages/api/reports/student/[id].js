import connect from '../../../../lib/mongodb'
import Attempt from '../../../../models/Attempt'
import { getUserFromRequest } from '../../../../lib/auth'

export default async function handler(req, res) {
  await connect()
  const user = await getUserFromRequest(req)
  const { id } = req.query
  if (!user) return res.status(401).json({ error: 'Unauthorized' })
  // Students can fetch their own report; teachers can fetch any student
  if (user.role === 'student' && String(user._id) !== String(id)) return res.status(403).json({ error: 'Forbidden' })
  const attempts = await Attempt.find({ student: id }).populate('quiz', 'title').lean()
  res.json({ attempts })
}
