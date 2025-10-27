import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="container">
      <header style={{marginBottom:12}}>
        <h1>Quiz App</h1>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
          <Link href="/dashboard">Dashboard</Link>
              <Link href="/client">Frontend Quiz</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
