import React, { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([]) // {role:'user'|'assistant', text}
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    try {
      const payload = { prompt: input, options: {} }
      const res = await fetch('/api/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Worker error')
      const data = await res.json()
      const assistantText = typeof data.result === 'string' ? data.result : JSON.stringify(data.result)
      setMessages((m) => [...m, { role: 'assistant', text: assistantText }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', text: `Error: ${e.message}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{padding:16}}>
      <h2>Build & Development — Chat (GPT/Claude-like)</h2>
      <div style={{border:'1px solid #ddd', padding:12, minHeight:240, maxHeight:420, overflow:'auto', marginTop:8}}>
        {messages.length === 0 && <div style={{color:'#666'}}>ابدأ المحادثة بكتابة رسالة ثم اضغط إرسال</div>}
        {messages.map((m, i) => (
          <div key={i} style={{marginBottom:10}}>
            <div style={{fontSize:12, color:'#888'}}>{m.role === 'user' ? 'أنت' : 'المساعد'}</div>
            <div style={{background: m.role === 'user' ? '#e6f7ff' : '#f5f5f5', padding:8, borderRadius:6}}>{m.text}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex', gap:8, marginTop:12}}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="اكتب رسالتك..." style={{flex:1}} onKeyDown={(e)=>{ if(e.key==='Enter'){ send() } }} />
        <button onClick={send} disabled={loading}>{loading ? 'جاري الإرسال...' : 'أرسل'}</button>
      </div>
    </div>
  )
}
