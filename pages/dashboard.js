import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/auth/me')
        if (!res.ok) return Router.push('/login')
        const data = await res.json()
        setUser(data.user)
      } catch (e) {
        Router.push('/login')
      }
    }
    load()
    fetch('/api/quizzes').then(r => r.json()).then(d => setQuizzes(d.quizzes || []))
  }, [])

  if (!user) return <Layout><p>Loading...</p></Layout>

  return (
    <Layout>
      <h2>Dashboard</h2>
      <p>Hi {user.name} — role: {user.role}</p>
      {user.role === 'teacher' ? (
        <div>
          <p><a href="/teacher/create">Create a quiz</a></p>
          <h3>Your quizzes</h3>
          {quizzes.map(q => (
            <div key={q._id} className="card"><strong>{q.title}</strong><div className="muted">{q.description}</div></div>
          ))}
        </div>
      ) : (
        <div>
          <p><a href="/student/quizzes">Take quizzes</a></p>
          <h3>Available quizzes</h3>
          {quizzes.map(q => (
            <div key={q._id} className="card"><strong>{q.title}</strong><div className="muted">{q.description}</div><div style={{marginTop:8}}><a href={`/quiz/${q._id}`}><button>Take</button></a></div></div>
          ))}
        </div>
      )}
    </Layout>
  )
}
