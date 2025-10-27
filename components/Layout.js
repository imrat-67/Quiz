import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="site">
      <header className="site-header">
        <div className="header-inner">
          <Link href="/">
            <a className="brand">
              <span className="logo">📝</span>
              <span className="brand-text">Quizify</span>
            </a>
          </Link>

          <nav className="nav">
            <Link href="/"><a>Home</a></Link>
            <Link href="/client"><a>Frontend</a></Link>
            <Link href="/register"><a>Register</a></Link>
            <Link href="/login"><a>Login</a></Link>
            <Link href="/dashboard"><a>Dashboard</a></Link>
          </nav>
        </div>
      </header>

      <main className="content container">{children}</main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">© {new Date().getFullYear()} Quizify — Built with Next.js</div>
        </div>
      </footer>
    </div>
  )
}
