---
name: chat-wrap
description: "Ending or handing off a chat. Use BEFORE telling the user to start a new chat (chat getting long), and whenever they say \"archive this chat\", \"start a new chat\", \"new chat\", \"this chat is getting long\", \"hand it off\", \"wrap this chat\" or \"close this chat\". Rewrites the job's START HERE.md, gives a one-line copy-paste prompt (and puts it on the clipboard), then archives."
---

# chat-wrap: hand a job to a fresh chat without losing anything

Why: every message re-reads the whole chat, so a long chat burns usage fast. A fresh chat that reads one short
START HERE.md costs almost nothing and picks up exactly where the old one stopped.

## Running START HERE (every job longer than a few steps)
- Keep ONE `START HERE.md` in the job's folder. REWRITE it (never append) after each finished step, max ~40 lines:
  what's done, what's next (exact steps), exact file names, open questions.
- A new chat must be able to continue from it alone, with no re-discovering.
- Job finished = top line `DONE <date>`.

## New-chat handoff
When the chat gets long (or a new topic starts):
1. FIRST rewrite the job's `START HERE.md` (rules above).
2. THEN give a one-line copy-paste prompt in its own code block, short like
   `continue the Lucky and Spot skit batch from START HERE` (the job + the step, nothing else).
3. Copy that line to the clipboard too (Windows: `Set-Clipboard`, Mac: `pbcopy`) and say:
   "Prompt's on your clipboard, paste it in a new chat."
A new chat given a prompt like that reads that START HERE.md before anything else and keeps it updated.

## "Archive this chat"
1. Check nothing is left behind: files saved in the project folder (not a temp folder), git committed if it's a repo,
   any text the user needs pasted in chat.
2. Work still going? Do the New-chat handoff above first.
3. Then archive this chat (`archive_session` with "self" in the Claude desktop app; in a terminal, just tell them it's safe to close).

## 🛑 on a chat title (cold-chat mod)
🛑 means the chat sat idle over an hour, so opening it again rereads everything at full price. Don't keep typing in
it: start a new chat with the one-line START HERE prompt instead.
