import { useMemo, useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function AnalyzeResultCard({ data, user }) {
  const [autoApplying, setAutoApplying] = useState(false)
  const [autoAppliedCount, setAutoAppliedCount] = useState(null)

  const commission = 0.1

  const breakdown = useMemo(() => {
    const post = data.estimated_rates.post || 0
    return {
      post: { gross: post, fee: Math.round(post * commission), net: Math.round(post * (1 - commission)) },
      story: {
        gross: data.estimated_rates.story || 0,
        fee: Math.round((data.estimated_rates.story || 0) * commission),
        net: Math.round((data.estimated_rates.story || 0) * (1 - commission)),
      },
      reel: {
        gross: data.estimated_rates.reel || 0,
        fee: Math.round((data.estimated_rates.reel || 0) * commission),
        net: Math.round((data.estimated_rates.reel || 0) * (1 - commission)),
      },
    }
  }, [data])

  const startAutoApply = async () => {
    setAutoApplying(true)
    setAutoAppliedCount(null)
    try {
      // Simulate creating multiple applications
      const count = await new Promise((resolve) => setTimeout(() => resolve(7), 1000))
      setAutoAppliedCount(count)
    } finally {
      setAutoApplying(false)
    }
  }

  const canAutoApply = Boolean(user)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Rate-card preview</h3>
          <p className="text-xs text-slate-500">Confidence {Math.round(data.confidence * 100)}% • Top location {data.top_location}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">{data.handle}</span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Metric label="Followers" value={formatNumber(data.followers)} />
        <Metric label="Avg likes" value={formatNumber(data.avg_likes)} />
        <Metric label="Engagement" value={`${data.engagement_rate}%`} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <PriceCard title="Post" price={breakdown.post.gross} fee={breakdown.post.fee} net={breakdown.post.net} />
        <PriceCard title="Story" price={breakdown.story.gross} fee={breakdown.story.fee} net={breakdown.story.net} />
        <PriceCard title="Reel" price={breakdown.reel.gross} fee={breakdown.reel.fee} net={breakdown.reel.net} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500">
          Rates are estimates. Platform fee shown for transparency. Payments held in secure escrow until delivery.
        </div>
        <button
          onClick={startAutoApply}
          disabled={!canAutoApply || autoApplying}
          className="h-10 px-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {autoApplying ? (
            <span className="inline-flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Sending...</span>
          ) : (
            'Save & Auto-Apply'
          )}
        </button>
      </div>

      {autoAppliedCount !== null && (
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md p-3 text-sm">
          <CheckCircle size={16} /> Auto-applied to {autoAppliedCount} matching campaigns. Check your dashboard to track status.
        </div>
      )}
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  )
}

function PriceCard({ title, price, fee, net }) {
  return (
    <div className="rounded-lg border bg-white p-4 space-y-2">
      <div className="font-medium">{title}</div>
      <div className="text-2xl font-semibold">₹{formatNumber(price)}</div>
      <div className="text-xs text-slate-500">Commission ~ ₹{formatNumber(fee)} • Net to creator ₹{formatNumber(net)}</div>
    </div>
  )
}

function formatNumber(n) {
  if (typeof n !== 'number') return n
  return n.toLocaleString('en-IN')
}
