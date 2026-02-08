import React, { useState } from 'react'

export default function AIStudio(){
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('crewai')
  const [temperature, setTemperature] = useState(0.7)
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)

  async function run() {
    setLoading(true)
    setOutput(null)
    try{
      const payload = { prompt, options: { model, temperature } }
      const res = await fetch('/api/ai/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      if(!res.ok) throw new Error('worker error')
      const data = await res.json()
      setOutput(data.result)
    }catch(e){
      setOutput({ error: e.message })
    }finally{ setLoading(false) }
  }

  return (
    <div style={{padding:16}}>
      <h2>AI Studio</h2>
      <div style={{marginTop:12}}>
        <label>Model: </label>
        <select value={model} onChange={e=>setModel(e.target.value)}>
          <option value="crewai">CrewAI</option>
          <option value="gemini">Gemini</option>
        </select>
      </div>
      <div style={{marginTop:8}}>
        <label>Temperature: </label>
        <input type="number" step="0.1" min="0" max="1" value={temperature} onChange={e=>setTemperature(Number(e.target.value))} />
      </div>
      <div style={{marginTop:12}}>
        <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="اكتب موجه التجربة هنا" style={{width:'100%', minHeight:120}} />
      </div>
      <div style={{marginTop:8}}>
        <button onClick={run} disabled={loading}>{loading ? 'تشغيل...' : 'تشغيل النموذج'}</button>
      </div>
      <div style={{marginTop:12}}>
        <h4>Output</h4>
        <pre style={{whiteSpace:'pre-wrap', background:'#f7f7f7', padding:8}}>{output ? (typeof output === 'string' ? output : JSON.stringify(output, null, 2)) : 'لا توجد نتيجة بعد'}</pre>
      </div>
    </div>
  )
}
