# Talking Agent + Client Product Packs

## Talking agent (RileyJarvis pattern)

Reference: [rbrown101010/rileyjarvis](https://github.com/rbrown101010/rileyjarvis)

RileyJarvis is a local Electron companion with **OpenAI Realtime** speech-to-speech, animated face states, and an artifact panel. StudEx uses this as the **voice UX pattern** for NestVM — not a wholesale replace of Super Agents.

| Layer | StudEx mapping |
|-------|----------------|
| Realtime STT/TTS | OpenAI Realtime (RileyJarvis) or ElevenLabs + STT |
| Companion UI | Soul / talking agent face in client portal |
| Brain | NestVM Super Agents (private per client) |
| Presence | Pixel boardroom character lights up while speaking |

**Tier voice entitlements**
- Meat OS — chat + limited voice minutes  
- Agency OS — realtime talking agent  
- Marketplace OS — always-on voice + boardroom/factory world  

## Buy matrix: capacity × product

Clients pick **one capacity tier** and **one product pack**:

| Product pack | Industry | Scenes |
|--------------|----------|--------|
| **StudEx Meat** | Wagyu / Ankole / butchery | Boardroom + cold-chain floor |
| **StudEx Coffee** | Origin → roast → export | Boardroom + roastery / agri floor |
| **StudEx World** | NestVM Agent Empire | Boardroom + Dark Factory / digital city |

Same agent runtime; different workflows, scene packs, and talking-agent persona.

## UI

War Room → **Super Agents** tab shows:
1. Talking-agent strip (RileyJarvis link)
2. Three pricing tiers with product toggles (Meat / Coffee / World)
3. Matrix summary of what each product means at each tier
