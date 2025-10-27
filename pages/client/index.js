import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

export default function ClientIndex() {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem('client_quizzes')
    setQuizzes(raw ? JSON.parse(raw) : [])
  }, [])

  function remove(id) {
    const arr = quizzes.filter(q => q.id !== id)
    localStorage.setItem('client_quizzes', JSON.stringify(arr))
    setQuizzes(arr)
  }

  return (
    <Layout>
      <h2>Frontend-only Quiz System</h2>
      <p className="muted">This version stores quizzes in your browser (localStorage). Teachers can create quizzes immediately and students can take them without a backend.</p>
      <div style={{marginTop:12, marginBottom:12}}>
        <Link href="/client/create"><button>Create a quiz (client-side)</button></Link>
        <Link href="/client/attempts" style={{marginLeft:8}}><button style={{marginLeft:8}}>Attempts</button></Link>
      </div>

      {quizzes.length === 0 && <div className="card">No quizzes yet. Create one!</div>}
      {quizzes.map(q => (
        <div key={q.id} className="card">
          <strong>{q.title}</strong>
          <div className="muted">{q.description}</div>
          <div style={{marginTop:8}}>
            <Link href={`/client/play/${q.id}`}><button>Take Quiz</button></Link>
            <button style={{marginLeft:8}} onClick={() => remove(q.id)}>Delete</button>
          </div>
        </div>
      ))}
    </Layout>
  )
}
