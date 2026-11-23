# Install (for Claude to follow)

1. Copy `skills/chat-wrap/` to `~/.claude/skills/chat-wrap/`.
2. Copy `mods/cold-chat/` (including its hidden `.claude-plugin` folder) to `~/.claude/mods/cold-chat/`.
3. Load the mod in every chat: in `~/.claude/settings.json` add the full path of `~/.claude/mods/cold-chat` to the
   `env` value `CLAUDE_CODE_PLUGIN_DIRS` (create it if missing; several folders are separated by `;` on Windows, `:` on Mac).
   Keep everything else in settings.json as it is.
4. Add this to the END of `~/.claude/CLAUDE.md` (create the file if missing):

```
# Saving usage (Pro plan)
- Every message re-reads the whole chat, so chat length is the #1 cost. One job per chat.
- Any job longer than a few steps keeps ONE `START HERE.md` in its folder, REWRITTEN (never appended) after each
  finished step, max ~40 lines: what's done, what's next, exact file names, open questions. Done = top line `DONE <date>`.
- Chat getting long, or a new topic: use the `chat-wrap` skill (START HERE + one-line prompt for a new chat).
- 🛑 on a chat's title = idle over an hour, waking it costs full price: start a new chat from START HERE instead.
- A new chat given "continue X from START HERE" reads that START HERE.md first and keeps it updated.
- Keep tool output small (head/grep/limits), never dump big files or logs.
```

5. Tell the user: "Done. Restart the Claude app once so the 🛑 mod loads." The 🛑 only shows in the Claude desktop app.
