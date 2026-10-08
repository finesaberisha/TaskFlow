'use client'

import { FormEvent, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check, Eye, EyeOff, Layers3, Loader2, LockKeyhole, Mail, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

type User = { name: string; email: string; password: string }

function BrandPanel() {
  return <section className="relative hidden min-h-screen overflow-hidden bg-[#0b1730] px-12 py-12 text-white lg:flex lg:w-[48%] lg:flex-col lg:justify-between"><div className="absolute -right-32 -top-32 size-96 rounded-full bg-indigo-500/20 blur-3xl" /><div className="absolute -bottom-40 -left-20 size-96 rounded-full bg-cyan-400/10 blur-3xl" /><div className="relative"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/30"><Sparkles className="size-5" /></div><div><div className="text-lg font-bold tracking-tight">TaskFlow</div><div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Project management</div></div></div><div className="mt-24 max-w-md"><p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">Your work, in motion</p><h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.04em]">Plan smarter.<br />Work together.<br /><span className="text-indigo-300">Get things done.</span></h1><p className="mt-7 max-w-sm text-base leading-7 text-slate-400">A focused workspace for turning ambitious projects into clear, coordinated progress.</p></div></div><div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 backdrop-blur"><div className="mb-4 flex items-center justify-between"><div className="flex gap-1.5"><span className="size-2 rounded-full bg-rose-300/70" /><span className="size-2 rounded-full bg-amber-300/70" /><span className="size-2 rounded-full bg-emerald-300/70" /></div><span className="text-[10px] font-medium text-slate-500">Workspace overview</span></div><div className="grid grid-cols-3 gap-3"><div className="rounded-xl bg-white/[0.07] p-3"><div className="mb-3 h-1.5 w-12 rounded-full bg-indigo-300/70" /><div className="h-2 w-20 rounded-full bg-white/20" /><div className="mt-2 h-2 w-14 rounded-full bg-white/10" /></div><div className="rounded-xl bg-white/[0.07] p-3"><div className="mb-3 h-1.5 w-10 rounded-full bg-amber-300/70" /><div className="h-2 w-16 rounded-full bg-white/20" /><div className="mt-2 h-2 w-20 rounded-full bg-white/10" /></div><div className="rounded-xl bg-white/[0.07] p-3"><div className="mb-3 h-1.5 w-14 rounded-full bg-emerald-300/70" /><div className="h-2 w-20 rounded-full bg-white/20" /><div className="mt-2 h-2 w-12 rounded-full bg-white/10" /></div></div></div></section>
}

export default function LoginPage() {
  const router = useRouter(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [remember, setRemember] = useState(true); const [show, setShow] = useState(false); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const submit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  const normalized = email.trim().toLowerCase()

  if (!normalized) {
    return setError('Please enter your email address.')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return setError('Please enter a valid email address.')
  }

  if (!password) {
    return setError('Please enter your password.')
  }

  if (password.length < 8) {
    return setError('Password must be at least 8 characters.')
  }

  setError('')
  setLoading(true)

  const { error } = await supabase.auth.signInWithPassword({
    email: normalized,
    password,
  })

  if (error) {
    setLoading(false)
    return setError('The email or password you entered is incorrect.')
  }

  window.location.href = '/?login=test'
}
  return <main className="min-h-screen bg-[#f5f7fb] lg:flex"><BrandPanel /><section className="flex min-h-screen flex-1 items-center justify-center px-6 py-10 sm:px-12"><div className="w-full max-w-[420px]"><div className="mb-10 flex items-center gap-3 lg:hidden"><div className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white"><Sparkles className="size-5" /></div><span className="text-lg font-bold tracking-tight text-slate-950">TaskFlow</span></div><div className="mb-8"><div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"><LockKeyhole className="size-5" /></div><h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">Welcome back</h2><p className="mt-2 text-sm leading-6 text-slate-500">Sign in to continue to your workspace.</p></div><form onSubmit={submit} className="space-y-5"><div className="space-y-2"><label htmlFor="email" className="text-sm font-semibold text-slate-700">Email address</label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-3 size-4 text-slate-400" /><Input id="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 border-slate-200 bg-white pl-10 shadow-sm focus-visible:ring-indigo-500" /></div></div><div className="space-y-2"><div className="flex items-center justify-between"><label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label><button type="button" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Forgot password?</button></div><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-3 size-4 text-slate-400" /><Input id="password" type={show ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 border-slate-200 bg-white pl-10 pr-10 shadow-sm focus-visible:ring-indigo-500" /> <button type="button" aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-2 top-2 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" onClick={() => setShow((value) => !value)}>{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></div><label className="flex items-center gap-2 text-sm text-slate-500"><Checkbox checked={remember} onCheckedChange={(value) => setRemember(value === true)} />Remember me</label>{error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700">{error}</p>}<Button type="submit" disabled={loading} className="h-11 w-full bg-indigo-600 font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700">{loading ? <><Loader2 className="animate-spin" data-icon="inline-start" />Signing in…</> : <>Sign In<ArrowRight data-icon="inline-end" /></>}</Button></form><p className="mt-8 text-center text-sm text-slate-500">Don&apos;t have an account? <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">Sign up</a></p><div className="mt-10 flex items-center justify-center gap-2 text-[11px] text-slate-400"><Check className="size-3.5 text-emerald-500" />Your workspace is private and secure</div></div></section></main>
}
