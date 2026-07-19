# Talking Agent + Client Product Packs

## Talking agent (OpenJarvis — primary)

**Primary stack:** [OpenJarvis](https://github.com/open-jarvis/OpenJarvis) on the Mac Mini NestVM.  
Setup guide: [`os/openjarvis/VOICE_SETUP.md`](../openjarvis/VOICE_SETUP.md)

| Layer | StudEx mapping |
|-------|----------------|
| Brain | Local Ollama via OpenJarvis |
| TTS | Cartesia (Sterling) or OpenAI TTS — API key required for speech only |
| Companion UI | OpenJarvis desktop / `jarvis serve` audio API |
| Presence (later) | Pixel boardroom character lights up while speaking |

**Legacy reference:** [RileyJarvis](https://github.com/rbrown101010/rileyjarvis) = OpenAI Realtime face demo. Use OpenJarvis for NestVM product voice.

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
