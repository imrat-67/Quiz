import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'

export default function Attempts() {
  const [attempts, setAttempts] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem('client_attempts')
    setAttempts(raw ? JSON.parse(raw) : [])
  }, [])

  return (
    <Layout>
      <h2>Your Attempts (browser)</h2>
      {attempts.length === 0 && <div className="card">No attempts yet.</div>}
      {attempts.map(a => (
        <div key={a.id} className="card">
          <div><strong>Quiz:</strong> {a.quizId}</div>
          <div className="muted">Score: {a.score} / {a.total}</div>
          <div className="muted">At: {new Date(a.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </Layout>
  )
}
