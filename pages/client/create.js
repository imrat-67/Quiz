import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default function ClientCreate() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState([{ text: '', choices: ['', ''], correctIndex: 0 }])

  function addQuestion() {
    setQuestions([...questions, { text: '', choices: ['', ''], correctIndex: 0 }])
  }

  function updateQuestion(i, field, value) {
    const copy = JSON.parse(JSON.stringify(questions))
    copy[i][field] = value
    setQuestions(copy)
  }

  function addChoice(qi) {
    const copy = JSON.parse(JSON.stringify(questions))
    copy[qi].choices.push('')
    setQuestions(copy)
  }

  function updateChoice(qi, ci, val) {
    const copy = JSON.parse(JSON.stringify(questions))
    copy[qi].choices[ci] = val
    setQuestions(copy)
  }

  function save() {
    if (!title) return alert('Please enter title')
    const raw = localStorage.getItem('client_quizzes')
    const arr = raw ? JSON.parse(raw) : []
    const id = Date.now().toString(36)
    arr.push({ id, title, description, questions })
    localStorage.setItem('client_quizzes', JSON.stringify(arr))
    router.push('/client')
  }

  return (
    <Layout>
      <h2>Create Quiz (client-side)</h2>
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
            <input value={q.text} onChange={e => updateQuestion(qi, 'text', e.target.value)} />
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
            <label>Correct choice index (0-based)</label>
            <input type="number" value={q.correctIndex} onChange={e => updateQuestion(qi, 'correctIndex', Number(e.target.value))} />
          </div>
        </div>
      ))}

      <div style={{marginTop:8}}>
        <button onClick={addQuestion}>Add question</button>
      </div>
      <div style={{marginTop:12}}>
        <button onClick={save}>Save Quiz</button>
      </div>
    </Layout>
  )
}
