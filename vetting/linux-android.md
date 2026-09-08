# SUPPLY CHAIN VETTING REPORT — mayukh4/linux-android

**Reviewed:** 2026-09-07 by Robusca
**Source:** https://github.com/mayukh4/linux-android
**What it claims to be:** Termux scripts that turn an old Android phone into a GPU-accelerated Linux desktop (XFCE4 / KDE / LXQt / MATE) or a Home Assistant smart-home server. No root, no PC, no cloud.
**Verdict:** ✅ **APPROVED — clean.** No malware, no exfiltration, no credential access, no backdoors. Four caveats below are worth fixing before you put this on any phone that shares a network with real infrastructure.
**Status:** Awaiting Agent Lord approval before anything is run on a device. Nothing was installed or executed during this review.

---

## Provenance

| | |
|---|---|
| Author | Mayukh Bagchi (single maintainer, real commit history since 2026-03-01) |
| Stars / forks | 3,057 / 226 |
| License | MIT |
| Last push | 2026-08-26 |
| Open issues | 3 |
| CI | GitHub Actions — `bash -n` syntax check + shellcheck at error severity |
| Companion | YouTube walkthrough, so the code is publicly demonstrated end to end |

Reasonable signals: real issue-driven commit history (issues #2, #4, #5 are each fixed with a comment explaining the root cause), a community-contributed Chinese README, its own lint CI. This is not a drive-by repo.

## What the code actually does

Two standalone bash scripts. Both are interactive — they prompt before making choices, and neither takes arguments or reads config from anywhere.

**`termux-linux-setup.sh`** (903 lines) — installs a desktop environment via Termux's own `apt`/`pkg`:
1. `pkg upgrade`, then adds `x11-repo` and `tur-repo`
2. Installs Termux-X11, the chosen DE, Mesa/Vulkan GPU stack, PulseAudio, Firefox, VLC, git, OpenSSH, Python
3. Optionally installs Hangover Wine + Box64 for Windows apps
4. Writes `~/start-linux.sh`, `~/stop-linux.sh`, `~/.config/linux-gpu.sh` and a few `.desktop` shortcuts

**`setup-homeassistant.sh`** (690 lines) — installs Home Assistant Core:
1. `proot-distro install ubuntu` (user-space container, no root)
2. Build deps inside the container, then `pip install homeassistant` into a venv
3. Writes a minimal `configuration.yaml` and `~/start|stop|upgrade-homeassistant.sh`
4. Optionally installs HACS

## Security findings

### Clean on everything that matters

- **No external code fetched except one** — every install goes through Termux `apt`/`pkg`, Ubuntu `apt`, or PyPI `pip`, all signature/TLS-verified by the package manager. The only exception is HACS (see below).
- **No secret or credential access** — no reads of `env`, `printenv`, `~/.ssh`, keystores, or any token/key path. Nothing is written to `authorized_keys`.
- **No network callbacks, telemetry, or exfiltration** — no `nc`, no `/dev/tcp`, no DNS tricks, no analytics ping. The only outbound URLs in the entire codebase are `get.hacs.xyz` (HACS installer) and two documentation links printed as text.
- **No destructive operations** — no `sudo`, no `dd`, no `mkfs`, nothing touching `/etc/passwd`, `/etc/shadow`, or `/etc/sudoers`. Every `rm -rf` is scoped to the user's own D-Bus scratch state (`$HOME/.dbus`, stale `dbus-*` sockets).
- **No overbroad permissions** — no `chmod 777` anywhere. `chmod +x` on scripts it just wrote, and `chmod 700` on `XDG_RUNTIME_DIR`, which is correct.
- **Deliberate, documented error handling** — the script skips `set -e`/`set -u` and explains why in a header comment (a failed optional package install shouldn't abort a 30-minute run). `set -o pipefail` is kept. That's a considered decision, not sloppiness.
- Both scripts pass `bash -n`.

### Caveat 1 — X11 access control is disabled (`-ac`)

`termux-linux-setup.sh:740` launches the display server as `termux-x11 :0 -ac`. The `-ac` flag turns off X11 access control entirely, so **any other app or process on that phone can connect to the display** — read the screen, inject keystrokes, log input. This is standard practice in Termux desktop guides and is local-only (not reachable off-device), but it means the phone's desktop session is only as trustworthy as every other app installed on that phone.

*Mitigation:* use a phone with nothing else installed on it, or drop `-ac` from `~/start-linux.sh` after install and set up `xauth` cookies instead.

### Caveat 2 — Home Assistant binds to `0.0.0.0` over plain HTTP, and onboarding is unauthenticated

`setup-homeassistant.sh:354` writes `server_host: 0.0.0.0`, so HA answers on port 8123 on every interface, over unencrypted HTTP. On first launch the onboarding screen has no authentication — **whoever reaches it first creates the admin account.** On a shared, guest, or office WiFi that is a live takeover window.

*Mitigation:* complete onboarding immediately on a network you control, put the phone on an isolated VLAN or guest network, and don't port-forward 8123. Add a TLS reverse proxy before this ever faces anything but a trusted LAN.

### Caveat 3 — HACS installs via unpinned pipe-to-shell

`setup-homeassistant.sh:509` runs `wget -q -O - https://get.hacs.xyz | bash -`. This is HACS's own official installation method and the domain is the legitimate project's, but it is still unpinned remote code with no checksum, executed inside the HA config directory. You inherit whatever `get.hacs.xyz` serves at the moment you run it.

*Mitigation:* answer **n** to the HACS prompt. It's optional and the HA install works fine without it — add community integrations later, deliberately, if you actually need them.

### Caveat 4 — PulseAudio TCP with anonymous auth

`termux-linux-setup.sh:736` loads `module-native-protocol-tcp auth-ip-acl=127.0.0.1 auth-anonymous=1`. Bound to loopback so it is not remotely reachable, but any local app can then reach the audio server, including the microphone. Same trust boundary as caveat 1, same mitigation: keep the phone clean.

### Non-security note

`setup-homeassistant.sh:326` patches `ifaddr/_posix.py` in site-packages with `sed`, replacing a raised `OSError` with `return []`. This works around Android 10+ blocking `getifaddrs()` inside proot, and the reason is documented — but it silences that whole error path library-wide inside the venv, so network-interface bugs in HA will fail silently rather than loudly. Acceptable given the alternative is HA not starting at all; just know it's there when debugging discovery problems.

## Where this could earn its place in the stack

Not a Studex-critical tool, but genuinely useful hardware arbitrage — an old Snapdragon phone is a silent, battery-backed ARM box with a built-in UPS and LTE fallback:

- **Facility / cold-chain monitoring** — HA on a phone in a Studex Meat facility, watching temperature sensors and smart plugs, surviving a power cut on its own battery.
- **In-store or event display driver** — a phone running a kiosked browser behind a screen at a tasting or trade activation. Cheaper and quieter than a mini PC.
- **Disposable jump box** — Python + SSH on port 8022 for on-site scripting, with nothing valuable on the device.

None of that is worth doing on a phone that shares a network with anything sensitive until caveats 1–3 are handled.

## Recommendation to Agent Lord

Approve for use **on a dedicated, wiped phone on an isolated network segment**. Concretely:

1. Factory-reset the phone first — caveats 1 and 4 mean every other installed app is in the trust boundary.
2. Install Termux from **F-Droid**, not the Play Store. The upstream README is right about this; the Play Store build is abandoned and won't work.
3. Answer **n** to HACS (caveat 3). Add it later by hand if needed.
4. Put the phone on a guest network or its own VLAN before starting HA, and finish onboarding on the spot (caveat 2).
5. Do not port-forward 8123 to the internet. Ever. If remote access is needed, use a VPN or Cloudflare Tunnel, not a port forward.
6. If you use the desktop path, edit `-ac` out of `~/start-linux.sh` afterwards.

Say the word and I'll write a hardened fork of the two scripts with those defaults baked in.
