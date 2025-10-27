import connect from '../../../lib/mongodb'
import Quiz from '../../../models/Quiz'
import { getUserFromRequest } from '../../../lib/auth'

export default async function handler(req, res) {
  await connect()
  const user = await getUserFromRequest(req)
  if (req.method === 'GET') {
    // list quizzes: students see all, teachers see their quizzes
    if (user && user.role === 'teacher') {
      const quizzes = await Quiz.find({ createdBy: user._id }).lean()
      return res.json({ quizzes })
    }
    const quizzes = await Quiz.find().lean()
    return res.json({ quizzes })
  }

  if (req.method === 'POST') {
    if (!user || user.role !== 'teacher') return res.status(403).json({ error: 'Only teachers can create quizzes' })
    const { title, description, questions } = req.body
    if (!title || !Array.isArray(questions)) return res.status(400).json({ error: 'Invalid payload' })
    const q = new Quiz({ title, description, questions, createdBy: user._id })
    await q.save()
    return res.json({ quiz: q })
  }

  res.status(405).end()
}
