import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <h2>Welcome to the Quiz App</h2>
      <p className="muted">Teachers can create quizzes. Students can take quizzes and view progress reports.</p>
      <div style={{marginTop:16}}>
        <Link href="/register"><button>Create account</button></Link>
      </div>
    </Layout>
  )
}
