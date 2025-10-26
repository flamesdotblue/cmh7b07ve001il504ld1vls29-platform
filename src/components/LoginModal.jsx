import { useState } from 'react'
import { X } from 'lucide-react'

export default function LoginModal({ onSuccess, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('Influencer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const signup = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email) {
      setError('Please enter name and email')
      return
    }
    setLoading(true)
    try {
      // Simulate OTP/verification success
      await new Promise((r) => setTimeout(r, 700))
      onSuccess({ name, email, type })
    } catch (_) {
      setError('Unable to sign in right now. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="dialog" aria-modal>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Sign in to continue</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-100" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={signup} className="p-4 grid gap-4">
          <div className="grid gap-1">
            <label className="text-sm text-slate-600">Full name</label>
            <input
              className="h-10 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-slate-600">Email</label>
            <input
              type="email"
              className="h-10 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-slate-500">We’ll send a magic link/OTP to verify.</p>
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-slate-600">I am a</label>
            <div className="flex gap-3">
              {['Influencer', 'Brand'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="type"
                    value={opt}
                    checked={type === opt}
                    onChange={() => setType(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="h-10 rounded-md bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
          >
            Continue
          </button>
          <p className="text-xs text-slate-500">No Instagram connect required. You can add details later.</p>
        </form>
      </div>
    </div>
  )
}
