import { renderHook, act, waitFor } from '@testing-library/react'
import useWebSocket from '../hooks/useWebSocket'

class MockSocket {
  constructor(url) {
    this.url = url
    this.readyState = MockSocket.CONNECTING
    this.onopen = null
    this.onmessage = null
    this.onclose = null
    this.onerror = null
    // simulate open
    setTimeout(() => {
      this.readyState = MockSocket.OPEN
      this.onopen && this.onopen()
    }, 0)
  }
  send(data) {
    // echo back
    setTimeout(() => {
      this.onmessage && this.onmessage({ data: `echo:${data}` })
    }, 0)
  }
  close() {
    this.readyState = MockSocket.CLOSED
    this.onclose && this.onclose()
  }
}
MockSocket.CONNECTING = 0
MockSocket.OPEN = 1
MockSocket.CLOSING = 2
MockSocket.CLOSED = 3

describe('useWebSocket', () => {
  let originalWebSocket
  beforeAll(() => {
    originalWebSocket = global.WebSocket
    global.WebSocket = MockSocket
  })
  afterAll(() => {
    global.WebSocket = originalWebSocket
  })

  test('connects and receives messages', async () => {
    const { result } = renderHook(() => useWebSocket('ws://test'))

    // wait for onopen
    await waitFor(() => expect(result.current.connected).toBe(true), { timeout: 100 })

    act(() => {
      result.current.sendMessage('hello')
    })

    await waitFor(() => expect(result.current.messages.some(m => m.includes('echo:hello'))).toBe(true), { timeout: 200 })
  })
})
