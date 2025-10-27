import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'

export default function Play() {
  const router = useRouter()
  const { id } = router.query
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!id) return
    const raw = localStorage.getItem('client_quizzes')
    const arr = raw ? JSON.parse(raw) : []
    const q = arr.find(x => x.id === id)
    setQuiz(q)
  }, [id])

  function select(qi, ci) {
    setAnswers({ ...answers, [qi]: ci })
  }

  function submit() {
    if (!quiz) return
    const processed = quiz.questions.map((q, qi) => ({ questionIndex: qi, selectedIndex: answers[qi] ?? null, correct: q.correctIndex === (answers[qi] ?? -1) }))
    const score = processed.filter(p => p.correct).length
    const attempt = { id: Date.now().toString(36), quizId: quiz.id, score, total: quiz.questions.length, createdAt: new Date().toISOString(), answers: processed }
    const raw = localStorage.getItem('client_attempts')
    const arr = raw ? JSON.parse(raw) : []
    arr.push(attempt)
    localStorage.setItem('client_attempts', JSON.stringify(arr))
    setResult(attempt)
  }

  if (!quiz) return <Layout><p>Loading...</p></Layout>

  return (
    <Layout>
      <h2>Take: {quiz.title}</h2>
      <p className="muted">{quiz.description}</p>
      {quiz.questions.map((q, qi) => (
        <div key={qi} className="card">
          <div><strong>Q{qi+1}:</strong> {q.text}</div>
          <div style={{marginTop:8}}>
            {q.choices.map((c, ci) => (
              <div key={ci} style={{marginBottom:6}}>
                <label>
                  <input type="radio" name={`q${qi}`} checked={answers[qi] === ci} onChange={() => select(qi, ci)} /> {c}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{marginTop:12}}>
        <button onClick={submit}>Submit</button>
      </div>
      {result && (
        <div style={{marginTop:12}} className="card">
          <h3>Result</h3>
          <div>Score: {result.score} / {result.total}</div>
          <div className="muted">Saved to browser attempts</div>
        </div>
      )}
    </Layout>
  )
}
