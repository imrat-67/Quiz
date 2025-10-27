import { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
  const [err, setErr] = useState('')

  async function submit(e) {
    e.preventDefault()
    setErr('')
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    if (!res.ok) return setErr(data.error || 'Failed')
    Router.push('/dashboard')
  }

  return (
    <Layout>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Name</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Role</label>
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        {err && <div style={{color:'red'}}>{err}</div>}
        <button type="submit">Register</button>
      </form>
    </Layout>
  )
}
