// cold-chat: 🛑 at the front of a chat's sidebar title once its prompt cache is cold.
// A chat idle over 60 min has a cold cache, so waking it rereads the whole chat at full price.
// Instead of waking it: start a new chat from its START HERE.md (chat-wrap skill).
// Any open chat with this mod sweeps ALL chats every 5 min (a cold chat can't mark itself: it's not running).
// The sweep removes 🛑 again once a chat is used.
import type { EngineInterface, Register } from 'claude-code'

export const COLD = '🛑 '
export const COLD_MS = 60 * 60 * 1000
const EVERY_MS = 5 * 60 * 1000
const SERVER = 'ccd_session_mgmt'

type Row = { sessionId?: string; title?: string; isRunning?: boolean; isArchived?: boolean; lastActivityAt?: string }

const textOf = (r: { content: { type: string; text?: string }[] }): string =>
  r.content.map(c => (c.type === 'text' ? c.text ?? '' : '')).join('')

export const stripCold = (t: string): string => {
  let s = t
  while (s.startsWith(COLD)) s = s.slice(COLD.length)
  return s
}

// The title a row should have now, or null to leave it alone.
export function wanted(r: Row, now: number): string | null {
  if (typeof r.title !== 'string' || !r.sessionId || r.isArchived) return null
  const at = Date.parse(r.lastActivityAt ?? '')
  if (Number.isNaN(at)) return null
  const base = stripCold(r.title)
  if (!base.trim()) return null
  const cold = !r.isRunning && now - at > COLD_MS
  const next = cold ? COLD + base : base
  return next === r.title ? null : next
}

let sweeping = false
async function sweep($: EngineInterface): Promise<void> {
  if (sweeping) return
  sweeping = true
  try {
    const r = await $.mcp.call(SERVER, 'list_sessions', { limit: 100 })
    if (r.isError) return
    const rows = JSON.parse(textOf(r as never)) as Row[]
    const now = await $.clock.now()
    for (const row of rows) {
      const next = wanted(row, now)
      if (next === null) continue
      await $.mcp.call(SERVER, 'set_session_title', { session_id: row.sessionId, title: next }).catch(() => {})
    }
  } catch {
    // App tools missing (terminal, phone) or a bad reply: try again next sweep.
  } finally {
    sweeping = false
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const out = await next(e)
    $.clock.after(20_000, () => sweep($))
    $.clock.every(EVERY_MS, () => sweep($))
    return out
  })
}
