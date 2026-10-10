# StudEx Hermes Voice

RileyJarvis fork — realtime voice to the StudEx agent mesh.

## Riley Voices

OpenAI Realtime voices (set in `.env.local`):

| Voice | Character |
|-------|-----------|
| **cedar** | Default — confident, calm (Hermes) |
| alloy | Neutral |
| echo | Warm |
| marin | Clear |
| ash | Soft |

```bash
OPENAI_VOICE=cedar
```

## Setup

```bash
# 1. Start Puppetier voice bridge
cd ../voice-bridge && npm install ws@8 && npm start

# 2. Start Hermes Voice (macOS)
cp .env.example .env.local
# Add OPENAI_API_KEY
npm install
npm run dev
```

## Voice commands

- *"Hermes, what's the agent status?"*
- *"Delegate to OpenClaw — draft a StudEx Meat post"*
- *"Ask Goose to deploy the War Room"*
- *"Treasury — revenue status"*
- *"Show pending approvals"*

## Architecture

```
You speak → OpenAI Realtime (gpt-realtime-2)
         → hermes_* tools
         → WebSocket :8765 voice-bridge
         → MCP :8787
         → Hermes / OpenClaw / Goose / Treasury
```

## License

MIT (RileyJarvis base) + StudEx extensions.
