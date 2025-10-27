import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default function QuizPage() {
  const router = useRouter()
  const { id } = router.query
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/quizzes/${id}`).then(r => r.json()).then(d => setQuiz(d.quiz))
  }, [id])

  function select(qi, ci) {
    setAnswers({ ...answers, [qi]: ci })
  }

  async function submit() {
    const payload = { quizId: id, answers: Object.keys(answers).map(k => ({ questionIndex: Number(k), selectedIndex: answers[k] })) }
    const res = await fetch('/api/attempts/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (res.ok) setResult(data.attempt)
    else alert(data.error || 'Failed')
  }

  if (!quiz) return <Layout><p>Loading...</p></Layout>

  return (
    <Layout>
      <h2>{quiz.title}</h2>
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
          <div>Score: {result.score} / {quiz.questions.length}</div>
        </div>
      )}
    </Layout>
  )
}
