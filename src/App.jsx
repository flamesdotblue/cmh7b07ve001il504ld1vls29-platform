import { useState } from 'react'
import NavBar from './components/NavBar'
import HeroPasteWidget from './components/HeroPasteWidget'
import LoginModal from './components/LoginModal'
import AnalyzeResultCard from './components/AnalyzeResultCard'

function App() {
  const [user, setUser] = useState(null) // { name, email, type: 'Influencer'|'Brand' }
  const [showLogin, setShowLogin] = useState(false)
  const [analyzeLoading, setAnalyzeLoading] = useState(false)
  const [analyzeError, setAnalyzeError] = useState('')
  const [analyzeData, setAnalyzeData] = useState(null)
  const [pendingHandle, setPendingHandle] = useState('')

  const handleAnalyze = (rawHandleOrUrl) => {
    setAnalyzeError('')
    const extracted = extractHandle(rawHandleOrUrl)
    if (!extracted) {
      setAnalyzeError('Please paste a valid Instagram handle or profile URL')
      return
    }

    if (!user) {
      setPendingHandle(extracted)
      setShowLogin(true)
      return
    }

    performAnalyze(extracted)
  }

  const onAuthSuccess = (u) => {
    setUser(u)
    setShowLogin(false)
    if (pendingHandle) {
      performAnalyze(pendingHandle)
      setPendingHandle('')
    }
  }

  const performAnalyze = async (handle) => {
    setAnalyzeLoading(true)
    setAnalyzeData(null)
    setAnalyzeError('')
    try {
      const res = await mockAnalyze(handle)
      setAnalyzeData(res)
    } catch (e) {
      setAnalyzeError('Unable to analyze profile right now. Please try again.')
    } finally {
      setAnalyzeLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <NavBar user={user} onSignIn={() => setShowLogin(true)} />

      <main className="max-w-6xl mx-auto px-4">
        <section className="py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                Paste your Instagram link — get brands, earn with one click
              </h1>
              <p className="mt-4 text-slate-600">
                No account required — paste a link to get a free rate-card. Login required to apply.
              </p>
              <div className="mt-8">
                <HeroPasteWidget onAnalyze={handleAnalyze} analyzeLoading={analyzeLoading} />
                {analyzeError && (
                  <p className="mt-2 text-sm text-red-600" role="alert">{analyzeError}</p>
                )}
              </div>
            </div>
            <div className="md:border md:rounded-xl md:p-6 md:bg-white md:shadow-sm">
              {analyzeLoading && (
                <div className="animate-pulse" aria-busy>
                  <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
                  <div className="h-40 bg-slate-200 rounded" />
                </div>
              )}
              {!analyzeLoading && analyzeData && (
                <AnalyzeResultCard
                  data={analyzeData}
                  user={user}
                />
              )}
              {!analyzeLoading && !analyzeData && (
                <div className="text-slate-500 text-sm">
                  Your profile insights and suggested rates will appear here after analysis.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onSuccess={onAuthSuccess} />
      )}

      <footer className="border-t bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-slate-500">
          <span>© {new Date().getFullYear()} LinkApply</span>
          <span>Secure escrow • Transparent fees • Creator-first</span>
        </div>
      </footer>
    </div>
  )
}

function extractHandle(input) {
  if (!input) return ''
  const s = input.trim()
  if (s.startsWith('http')) {
    try {
      const u = new URL(s)
      const parts = u.pathname.split('/').filter(Boolean)
      if (parts.length > 0) return parts[0]
    } catch (_) {
      return ''
    }
    return ''
  }
  return s.replace(/^@/, '')
}

function mockAnalyze(handle) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        handle: handle || 'clean_eating_2406',
        followers: 42000,
        avg_likes: 2300,
        engagement_rate: 5.5,
        top_location: 'Hyderabad, India',
        tags: ['health', 'food', 'recipes'],
        estimated_rates: { post: 7000, story: 1800, reel: 12000 },
        confidence: 0.86,
      })
    }, 900)
  })
}

export default App
