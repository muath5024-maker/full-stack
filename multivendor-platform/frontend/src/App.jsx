import React from 'react'
import UseWebSocket from './hooks/useWebSocket'
import Landing from './templates/Landing'
import Admin from './templates/Admin'
import Chat from './templates/Chat'
import AIStudio from './templates/AIStudio'
import { useState } from 'react'

export default function App() {
  const {connected, sendMessage, messages} = UseWebSocket('ws://localhost:8000/ws/chat')
  const [view, setView] = useState('landing')

  return (
    <div style={{fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto', padding: 24}} dir="rtl">
      <nav style={{display:'flex', gap:12, marginBottom:16}}>
        <button onClick={() => setView('landing')}>Landing</button>
        <button onClick={() => setView('admin')}>Admin</button>
        <button onClick={() => setView('build')}>البناء والتطوير</button>
        <button onClick={() => setView('ai')}>AI Studio</button>
      </nav>

      {view === 'landing' && <Landing />}
      {view === 'admin' && <Admin />}
      {view === 'build' && <Chat />}
      {view === 'ai' && <AIStudio />}

      <section style={{marginTop:24}}>
        <h3>WebSocket status: {connected ? 'متصل' : 'غير متصل'}</h3>
        <button onClick={() => sendMessage('مرحباً من الواجهة')}>أرسل اختبار</button>
        <ul>
          {messages.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </section>
    </div>
  )
}
