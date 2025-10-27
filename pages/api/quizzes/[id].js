import connect from '../../../lib/mongodb'
import Quiz from '../../../models/Quiz'
import { getUserFromRequest } from '../../../lib/auth'

export default async function handler(req, res) {
  await connect()
  const { id } = req.query
  const user = await getUserFromRequest(req)
  if (req.method === 'GET') {
    const quiz = await Quiz.findById(id).lean()
    if (!quiz) return res.status(404).json({ error: 'Not found' })
    return res.json({ quiz })
  }

  if (req.method === 'PUT') {
    if (!user || user.role !== 'teacher') return res.status(403).json({ error: 'Only teachers' })
    const quiz = await Quiz.findById(id)
    if (!quiz) return res.status(404).json({ error: 'Not found' })
    if (String(quiz.createdBy) !== String(user._id)) return res.status(403).json({ error: 'Not allowed' })
    const { title, description, questions } = req.body
    quiz.title = title || quiz.title
    quiz.description = description || quiz.description
    if (questions) quiz.questions = questions
    await quiz.save()
    return res.json({ quiz })
  }

  if (req.method === 'DELETE') {
    if (!user || user.role !== 'teacher') return res.status(403).json({ error: 'Only teachers' })
    const quiz = await Quiz.findById(id)
    if (!quiz) return res.status(404).json({ error: 'Not found' })
    if (String(quiz.createdBy) !== String(user._id)) return res.status(403).json({ error: 'Not allowed' })
    await quiz.remove()
    return res.json({ ok: true })
  }

  res.status(405).end()
}
