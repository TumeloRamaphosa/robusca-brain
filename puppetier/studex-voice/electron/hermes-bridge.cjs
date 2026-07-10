const { WebSocket } = require("ws");

class HermesBridge {
  constructor(url = "ws://127.0.0.1:8765") {
    this.url = url;
    this.ws = null;
    this.connected = false;
    this.pending = new Map();
    this.nextId = 1;
    this.reconnectTimer = null;
  }

  connect() {
    if (this.ws && this.connected) return;
    try {
      this.ws = new WebSocket(this.url);
      this.ws.on("open", () => {
        this.connected = true;
        console.log("[HermesBridge] connected", this.url);
      });
      this.ws.on("message", (data) => {
        try {
          const msg = JSON.parse(String(data));
          if (msg.id && this.pending.has(msg.id)) {
            const { resolve, reject } = this.pending.get(msg.id);
            this.pending.delete(msg.id);
            if (msg.ok) resolve(msg);
            else reject(new Error(msg.error || "hermes error"));
          }
        } catch (e) {
          console.error("[HermesBridge] parse error", e);
        }
      });
      this.ws.on("close", () => {
        this.connected = false;
        this.scheduleReconnect();
      });
      this.ws.on("error", () => {
        this.connected = false;
      });
    } catch (e) {
      this.scheduleReconnect();
    }
  }

  scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, 3000);
  }

  call(tool, args = {}, message) {
    return new Promise((resolve, reject) => {
      const id = String(this.nextId++);
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error("Hermes bridge timeout"));
      }, 45000);

      const finish = (fn) => (val) => {
        clearTimeout(timeout);
        fn(val);
      };

      this.pending.set(id, { resolve: finish(resolve), reject: finish(reject) });

      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        this.connect();
        return reject(new Error("Hermes voice bridge offline — start: cd puppetier/voice-bridge && npm start"));
      }

      this.ws.send(JSON.stringify({ id, tool, args, message }));
    });
  }

  status() {
    return { connected: this.connected, url: this.url };
  }
}

module.exports = { HermesBridge };
