'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Bot, Send, X } from 'lucide-react'
import { useState } from 'react'

export function DenielAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat({ transport: new DefaultChatTransport({ api: '/api/chat' }) })
  const busy = status === 'submitted' || status === 'streaming'
  const submitMessage = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const text = input.trim(); if (!text || busy) return; setInput(''); await sendMessage({ text }) }

  return <>
    {open && <section className="assistant-panel" aria-label="Deniel assistant">
      <header><div><span className="assistant-kicker"><Bot size={13} /> Ask Deniel</span><strong>Portfolio assistant</strong></div><button type="button" className="assistant-close" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18} /></button></header>
      <div className="assistant-messages" aria-live="polite">
        {messages.length === 0 && <p className="assistant-empty">Ask about Deniel&apos;s work, tools, projects, or how to start a conversation.</p>}
        {messages.map((message) => <div className={`assistant-message ${message.role}`} key={message.id}>{message.parts.filter((part) => part.type === 'text').map((part, index) => <p key={index}>{part.type === 'text' ? part.text : ''}</p>)}</div>)}
        {busy && <p className="assistant-thinking">Thinking through it...</p>}
      </div>
      <form className="assistant-form" onSubmit={submitMessage}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question..." aria-label="Ask the assistant" /><button type="submit" disabled={!input.trim() || busy} aria-label="Send question"><Send size={16} /></button></form>
    </section>}
    <button type="button" className="assistant-launcher" onClick={() => setOpen(!open)} aria-expanded={open}><Bot size={17} /> <span>{open ? 'Close assistant' : 'Ask Deniel'}</span></button>
  </>
}
