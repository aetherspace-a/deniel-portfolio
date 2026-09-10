'use client'

import { useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

const answers = [
  { label: 'What does Deniel do?', answer: 'Deniel works across community, documentation, design, and code — especially where those disciplines overlap.' },
  { label: 'What is the working style?', answer: 'Clear systems, thoughtful communication, and useful outcomes. The work starts by making complexity easier to navigate.' },
  { label: 'How can I get in touch?', answer: 'Send a note to hello@deniel.lol with the idea, problem, or opportunity you want to explore.' },
]

export function WorkAssistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState(answers[0])
  return <aside className={`assistant-drawer${open ? ' is-open' : ''}`} aria-hidden={!open} aria-label="Portfolio assistant"><div className="assistant-head"><span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Portfolio assistant</span><button type="button" onClick={onClose} aria-label="Close assistant"><X className="h-4 w-4" /></button></div><p className="assistant-title">Ask about the work.</p><div className="assistant-options">{answers.map((answer) => <button key={answer.label} type="button" className={selected.label === answer.label ? 'is-selected' : ''} onClick={() => setSelected(answer)}>{answer.label}<ArrowUpRight className="h-3.5 w-3.5" /></button>)}</div><div className="assistant-answer"><span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Answer</span><p>{selected.answer}</p></div></aside>
}
