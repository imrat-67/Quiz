import { useState } from 'react'
import Layout from '../../components/Layout'
import Router from 'next/router'

export default function CreateQuiz() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState([{ text: '', choices: ['', ''], correctIndex: 0 }])
  const [err, setErr] = useState('')

  function addQuestion() {
    setQuestions([...questions, { text: '', choices: ['', ''], correctIndex: 0 }])
  }

  function addChoice(qi) {
    const copy = JSON.parse(JSON.stringify(questions))
    copy[qi].choices.push('')
    setQuestions(copy)
  }

  function updateChoice(qi, ci, value) {
    const copy = JSON.parse(JSON.stringify(questions))
    copy[qi].choices[ci] = value
    setQuestions(copy)
  }

  async function submit(e) {
    e.preventDefault()
    setErr('')
    const res = await fetch('/api/quizzes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description, questions }) })
    const data = await res.json()
    if (!res.ok) return setErr(data.error || 'Failed')
    Router.push('/dashboard')
  }

  return (
    <Layout>
      <h2>Create Quiz</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Description</label>
          <input value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <h3>Questions</h3>
        {questions.map((q, qi) => (
          <div key={qi} className="card">
            <div className="form-row">
              <label>Question</label>
              <input value={q.text} onChange={e => { const c = [...questions]; c[qi].text = e.target.value; setQuestions(c) }} />
            </div>
            <div>
              <label>Choices</label>
              {q.choices.map((c, ci) => (
                <div key={ci} className="form-row">
                  <input value={c} onChange={e => updateChoice(qi, ci, e.target.value)} />
                </div>
              ))}
              <div style={{marginTop:8}}><button type="button" onClick={() => addChoice(qi)}>Add choice</button></div>
            </div>
            <div className="form-row">
              <label>Correct choice index</label>
              <input type="number" value={q.correctIndex} onChange={e => { const c = [...questions]; c[qi].correctIndex = Number(e.target.value); setQuestions(c) }} />
            </div>
          </div>
        ))}
        <div style={{marginTop:8}}>
          <button type="button" onClick={addQuestion}>Add question</button>
        </div>
        {err && <div style={{color:'red'}}>{err}</div>}
        <div style={{marginTop:12}}><button type="submit">Create Quiz</button></div>
      </form>
    </Layout>
  )
}
