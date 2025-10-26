import { useState } from 'react'
import { Rocket, Loader2 } from 'lucide-react'

export default function HeroPasteWidget({ onAnalyze, analyzeLoading }) {
  const [value, setValue] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onAnalyze(value)
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3" aria-label="Analyze Instagram profile">
      <input
        aria-label="Instagram link or handle"
        type="text"
        inputMode="url"
        placeholder="https://instagram.com/your_handle"
        className="flex-1 h-11 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 bg-white/90"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        disabled={analyzeLoading}
        className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-60"
      >
        {analyzeLoading ? <Loader2 className="animate-spin" size={18} /> : <Rocket size={18} />}
        Analyze profile
      </button>
    </form>
  )
}
