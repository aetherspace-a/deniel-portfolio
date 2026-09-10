'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Command, Search, X } from 'lucide-react'

const commands = [
  { label: 'Go to work', action: () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Go to music', action: () => document.querySelector('#music')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Go to contact', action: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) },
]

export function CommandPalette({ onAssistant }: { onAssistant: () => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  useEffect(() => {
    const handle = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setOpen(true) } if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') { event.preventDefault(); setOpen(true) } if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])
  const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()))
  return <><button type="button" className="palette-trigger" onClick={() => setOpen(true)} aria-label="Open command palette"><Command className="h-3.5 w-3.5" /><span>Command</span><kbd>⌘K</kbd></button>{open && <div className="palette-backdrop" role="presentation" onClick={() => setOpen(false)}><div className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette" onClick={(event) => event.stopPropagation()}><div className="palette-search"><Search className="h-4 w-4" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the portfolio" /><button type="button" onClick={() => setOpen(false)} aria-label="Close command palette"><X className="h-4 w-4" /></button></div><div className="palette-items">{filtered.map((command) => <button key={command.label} type="button" onClick={() => { command.action(); setOpen(false) }}>{command.label}<ArrowUpRight className="h-4 w-4" /></button>)}<button type="button" onClick={() => { setOpen(false); onAssistant() }}>Ask the portfolio assistant<ArrowUpRight className="h-4 w-4" /></button></div></div></div>}</>
}
