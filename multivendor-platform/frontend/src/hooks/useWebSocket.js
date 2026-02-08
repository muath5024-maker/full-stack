import {useEffect, useRef, useState} from 'react'

export default function useWebSocket(url) {
  const wsRef = useRef(null)
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    let mounted = true
    function connect() {
      wsRef.current = new WebSocket(url)
      wsRef.current.onopen = () => {
        if (!mounted) return
        setConnected(true)
      }
      wsRef.current.onmessage = (ev) => {
        if (!mounted) return
        setMessages(prev => [...prev, ev.data])
      }
      wsRef.current.onclose = () => {
        if (!mounted) return
        setConnected(false)
        // reconnect after delay
        setTimeout(() => connect(), 2000)
      }
      wsRef.current.onerror = () => {
        // close will trigger reconnect
        try { wsRef.current.close() } catch(e){}
      }
    }

    connect()
    return () => { mounted = false; try { wsRef.current && wsRef.current.close() } catch(e){} }
  }, [url])

  const sendMessage = (msg) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg)
    } else {
      console.warn('WebSocket not open')
    }
  }

  return {connected, messages, sendMessage}
}
