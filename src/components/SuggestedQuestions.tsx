const STARTER_QUESTIONS = [
  'What time is check-in?',
  'Do you have a swimming pool?',
  'Check room availability',
  'Is breakfast included?',
]

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {STARTER_QUESTIONS.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          className="rounded-full border border-sage-300 bg-white px-3.5 py-2 text-sm text-ink-700 transition hover:border-brand-400 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          {question}
        </button>
      ))}
    </div>
  )
}
