import connect from '../../lib/mongodb'

export default async function handler(req, res) {
  try {
    await connect()
    return res.json({ ok: true })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message })
  }
}
