import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  text: String,
  choices: [String],
  correctIndex: Number
}, { _id: false })

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [QuestionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema)
