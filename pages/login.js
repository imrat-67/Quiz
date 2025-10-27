import { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')

  async function submit(e) {
    e.preventDefault()
    setErr('')
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    if (!res.ok) return setErr(data.error || 'Failed')
    Router.push('/dashboard')
  }

  return (
    <Layout>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Email</label>
          <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>
        {err && <div style={{color:'red'}}>{err}</div>}
        <button type="submit">Login</button>
      </form>
    </Layout>
  )
}
