# Agent documents

Seven documents. Each is one agent's complete instruction set.

| File | Agent | Build order | Context |
|---|---|---|---|
| [00-ORCHESTRATOR.md](00-ORCHESTRATOR.md) | Orchestrator | 7th — last | own |
| [01-RESEARCHER.md](01-RESEARCHER.md) | Researcher | **2nd** | own |
| [02-OUTLINER.md](02-OUTLINER.md) | Outliner | 3rd | own |
| [03-WRITER.md](03-WRITER.md) | Writer | 4th | own |
| [04-EDITOR.md](04-EDITOR.md) | Editor | 6th | **fresh window** |
| [05-FACT-CHECKER.md](05-FACT-CHECKER.md) | Fact checker | **5th** | **fresh window** |
| [06-AI-EDITOR.md](06-AI-EDITOR.md) | AI editor | 6th | **fresh window** |

Build order 1 is not an agent — it is `constants/ICP.md`. Nothing here works
without it. See [../02-CONSTANTS-AND-GAPS.md](../02-CONSTANTS-AND-GAPS.md).

## The three rules that make this work

**One job each.** The editor does not fact-check. The fact checker does not edit
style. The AI editor touches only AI tells. Combining them produces several
mediocre passes instead of three good ones — this was the clearest finding in the
method we built from, and it is the easiest thing to accidentally undo.

**Fresh context for each editor.** An agent that has been improving a draft is
invested in it. The fact checker in particular must arrive hostile.

**Unsupported claims are deleted, not hedged.** Softening "40% of firms" into
"many firms" hides a fabrication rather than removing it, and it is the main route
by which invented numbers survive review and reach publication.

## Using them

Load the relevant document as the agent's instructions, supply the inputs it
lists, and take only the output it specifies. The orchestrator enforces the
sequence and refuses to skip a step.

Read the agent docs before running them. Understanding what each one does is what
makes troubleshooting possible when the output is wrong — and the output will be
wrong before it is right.
