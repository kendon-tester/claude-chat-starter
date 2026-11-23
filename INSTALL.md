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

5. The user is brand new to Claude. Tell them this, word for word (only fill in the bits in <>):

All set! First, close the Claude app all the way and open it again. That turns on the 🛑 (more on that below).

**Why any of this matters**
You're on the Pro plan, so you get a set amount of Claude use, and once it's gone you have to wait for it to come back.
Here's the catch: every time you send me a message, I re-read the WHOLE chat from the very top before I answer.
Message 5 is cheap. Message 80 means re-reading 79 messages first. It's like re-reading a whole book every time you
want to add one sentence. So long chats eat your usage really fast, and short chats keep it lasting.

**What I just set up**
1. A "skill" called chat-wrap. A skill is a set of instructions I follow when it fits what you're asking.
   This one helps you jump from a long chat to a fresh one without losing anything.
2. A "mod" called cold-chat. A mod is a small add-on that changes how the Claude app looks or works.
   This one puts a 🛑 in front of a chat's name in the list on the left.
3. A few rules in my main instructions file (CLAUDE.md), which I read at the start of every chat.
   They tell me to keep one job per chat and to keep a START HERE file updated.

**START HERE = your save point**
Think of it like saving in a video game. As we work on something (a video, a script), I keep a short file called
START HERE.md in that project's folder. It says what's done, what's next, and which files matter. I rewrite it after
every step, so it's always up to date.

**How you use it, day to day**
- Do one thing per chat. New video or new idea? New chat.
- When a chat starts getting long, just type: new chat
  I'll update the save point, then give you ONE line and copy it for you. It'll look like: continue <the job> from START HERE
  Open a new chat (the + / New chat button), paste it, hit enter. The new chat reads the save point and keeps going.
- 🛑 next to a chat's name means nobody's touched it for over an hour. Waking an old chat up costs extra,
  because I have to re-read it all at full price. So don't keep typing in it. Start a new chat and paste:
  continue <the job> from START HERE
- Done with a chat for good? Type: archive this chat
  I'll check nothing's left unsaved, then tuck it away so your list stays clean.

**Quick cheat sheet**
- new chat = save my spot and give me a line to start fresh
- archive this chat = I'm done with this one
- continue <job> from START HERE = pick up where I left off
- 🛑 = don't type here, start fresh instead

(The 🛑 only shows in the Claude desktop app, not in a terminal.)
