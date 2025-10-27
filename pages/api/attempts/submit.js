import connect from '../../../lib/mongodb'
import Quiz from '../../../models/Quiz'
import Attempt from '../../../models/Attempt'
import { getUserFromRequest } from '../../../lib/auth'

export default async function handler(req, res) {
  await connect()
  if (req.method !== 'POST') return res.status(405).end()
  const user = await getUserFromRequest(req)
  if (!user || user.role !== 'student') return res.status(403).json({ error: 'Only students can submit attempts' })
  const { quizId, answers } = req.body
  const quiz = await Quiz.findById(quizId).lean()
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' })
  // answers: [{ questionIndex, selectedIndex }]
  const processed = answers.map(a => {
    const q = quiz.questions[a.questionIndex]
    const correct = q && q.correctIndex === a.selectedIndex
    return { questionIndex: a.questionIndex, selectedIndex: a.selectedIndex, correct }
  })
  const score = processed.filter(a => a.correct).length
  const attempt = new Attempt({ quiz: quiz._id, student: user._id, answers: processed, score })
  await attempt.save()
  res.json({ attempt })
}
