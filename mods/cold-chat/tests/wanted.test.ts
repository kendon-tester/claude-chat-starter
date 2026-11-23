import { test, expect } from 'claude-code/testing'
import { wanted, COLD } from '../hooks/register'
const now = Date.parse('2026-11-21T20:00:00Z')
const row = (min: number, title: string, isRunning = false) =>
  ({ sessionId: 'local_x', title, isRunning, lastActivityAt: new Date(now - min * 60000).toISOString() })
test('marks idle over an hour', () => { expect(wanted(row(61, '✓ Foo'), now)).toBe(COLD + '✓ Foo') })
test('leaves warm chats', () => { expect(wanted(row(30, '✓ Foo'), now)).toBe(null) })
test('no double stop sign', () => { expect(wanted(row(90, COLD + 'Foo'), now)).toBe(null) })
test('removes when used again', () => { expect(wanted(row(2, COLD + 'Foo'), now)).toBe('Foo') })
test('running chats are never cold', () => { expect(wanted(row(90, 'Foo', true), now)).toBe(null) })
