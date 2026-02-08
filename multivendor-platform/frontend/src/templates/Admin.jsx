import React, { useEffect, useState } from 'react'

export default function Admin() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ id: '', project_type: 'landing', template: 'default', features: '{}' })
  const [error, setError] = useState('')

  const apiBase = '/api/projects'

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(apiBase)
      const data = await res.json()
      setProjects(data)
    } catch (e) {
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function createProject() {
    setError('')
    let features
    try {
      features = JSON.parse(form.features || '{}')
    } catch (e) {
      setError('features must be valid JSON')
      return
    }
    const payload = { id: Number(form.id), project_type: form.project_type, template: form.template, features }
    const res = await fetch(apiBase, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (!res.ok) {
      setError('Failed to create project')
    } else {
      setForm({ id: '', project_type: 'landing', template: 'default', features: '{}' })
      await load()
    }
  }

  async function deleteProject(id) {
    await fetch(`${apiBase}/${id}`, { method: 'DELETE' })
    await load()
  }

  async function editProject(p) {
    // populate form for editing
    setForm({ id: String(p.id), project_type: p.project_type, template: p.template, features: JSON.stringify(p.features || {}, null, 2) })
  }

  async function updateProject() {
    setError('')
    let features
    try {
      features = JSON.parse(form.features || '{}')
    } catch (e) {
      setError('features must be valid JSON')
      return
    }
    const payload = { id: Number(form.id), project_type: form.project_type, template: form.template, features }
    const res = await fetch(`${apiBase}/${form.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (!res.ok) {
      setError('Failed to update')
    } else {
      setForm({ id: '', project_type: 'landing', template: 'default', features: '{}' })
      await load()
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <p className="mt-3">Manage projects and templates here.</p>

      <section style={{marginTop:16}}>
        <h3>Create / Edit Project</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
          <input name="id" value={form.id} onChange={onChange} placeholder="id (number)" />
          <input name="project_type" value={form.project_type} onChange={onChange} placeholder="project_type" />
          <input name="template" value={form.template} onChange={onChange} placeholder="template" />
          <textarea name="features" value={form.features} onChange={onChange} placeholder='features as JSON' style={{gridColumn:'1 / -1', minHeight:80}} />
        </div>
        <div style={{marginTop:8, display:'flex', gap:8}}>
          <button onClick={createProject}>Create</button>
          <button onClick={updateProject}>Update</button>
          <button onClick={() => setForm({ id: '', project_type: 'landing', template: 'default', features: '{}' })}>Clear</button>
        </div>
        {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
      </section>

      <section style={{marginTop:24}}>
        <h3>Existing Projects</h3>
        {loading ? <div>Loading...</div> : (
          <ul>
            {projects.map(p => (
              <li key={p.id} style={{marginBottom:8}}>
                <strong>{p.project_type}</strong> — {p.template} (id: {p.id})
                <div style={{marginTop:4}}>
                  <button onClick={() => editProject(p)}>Edit</button>
                  <button onClick={() => deleteProject(p.id)} style={{marginLeft:8}}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
