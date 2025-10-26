import { LogIn, User } from 'lucide-react'

export default function NavBar({ user, onSignIn }) {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600" />
          <span className="font-semibold">LinkApply</span>
        </div>
        <nav className="flex items-center gap-3">
          <button className="text-sm px-3 py-1.5 rounded-md hover:bg-slate-100">For Brands</button>
          {!user ? (
            <button
              onClick={onSignIn}
              className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800"
            >
              <LogIn size={16} /> Sign In
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-slate-100">
              <User size={16} /> {user.name} · {user.type}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
