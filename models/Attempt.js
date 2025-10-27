import mongoose from 'mongoose'

const AnswerSchema = new mongoose.Schema({
  questionIndex: Number,
  selectedIndex: Number,
  correct: Boolean
}, { _id: false })

const AttemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [AnswerSchema],
  score: Number
}, { timestamps: true })

export default mongoose.models.Attempt || mongoose.model('Attempt', AttemptSchema)
