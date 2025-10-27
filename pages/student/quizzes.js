import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

export default function StudentQuizzes() {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    fetch('/api/quizzes').then(r => r.json()).then(d => setQuizzes(d.quizzes || []))
  }, [])

  return (
    <Layout>
      <h2>Available Quizzes</h2>
      {quizzes.map(q => (
        <div key={q._id} className="card">
          <strong>{q.title}</strong>
          <div className="muted">{q.description}</div>
          <div style={{marginTop:8}}><a href={`/quiz/${q._id}`}><button>Take Quiz</button></a></div>
        </div>
      ))}
    </Layout>
  )
}
