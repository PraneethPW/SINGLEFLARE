import { motion } from "framer-motion";
import { Bluetooth, BluetoothConnected, CircleAlert, Info, Radio, Search, Send, ShieldCheck, Smartphone, WifiOff, Zap } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../components/Button";

const UART_SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const UART_RX_CHARACTERISTIC = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const UART_TX_CHARACTERISTIC = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
const STORAGE_KEY = "signalflare-offline-bluetooth-chat";

type ChatStatus = "disconnected" | "pairing" | "connected" | "queued" | "unsupported";

interface OfflineMessage {
  id: string;
  body: string;
  direction: "sent" | "received" | "system";
  status: "sent" | "queued" | "received" | "system";
  createdAt: string;
}

function readMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as OfflineMessage[];
  } catch {
    return [];
  }
}

function createMessage(body: string, direction: OfflineMessage["direction"], status: OfflineMessage["status"]): OfflineMessage {
  return {
    id: crypto.randomUUID(),
    body,
    direction,
    status,
    createdAt: new Date().toISOString()
  };
}

export function OfflineBluetoothChat() {
  const [messages, setMessages] = useState<OfflineMessage[]>(() => readMessages());
  const [draft, setDraft] = useState("Need medical help near shelter gate.");
  const [deviceName, setDeviceName] = useState("");
  const [status, setStatus] = useState<ChatStatus>(() => (navigator.bluetooth ? "disconnected" : "unsupported"));
  const [error, setError] = useState("");
  const [lastScannedDevice, setLastScannedDevice] = useState("");
  const writeCharacteristic = useRef<BluetoothRemoteGATTCharacteristic | null>(null);

  const supportText = useMemo(() => {
    if (status === "unsupported") return "Web Bluetooth is not available in this browser. Use Chrome or Edge on a Bluetooth-capable device.";
    if (status === "connected") return `Connected to ${deviceName || "Bluetooth responder node"}. Messages will transmit over BLE UART.`;
    if (status === "queued") return "No Bluetooth link is active. Messages are stored locally and ready to forward once paired.";
    if (status === "pairing") return "Opening the browser Bluetooth picker. Select a nearby BLE responder node, ESP32/nRF device, or another device advertising a chat service.";
    return "Scan from Chrome or Edge on the laptop. Bluetooth must be on, and the other device must advertise as a BLE peripheral.";
  }, [deviceName, status]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  function addMessage(message: OfflineMessage) {
    setMessages((current) => [...current, message]);
  }

  async function pairDevice() {
    setError("");
    if (!navigator.bluetooth) {
      setStatus("unsupported");
      return;
    }

    try {
      setStatus("pairing");
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [UART_SERVICE]
      });
      setLastScannedDevice(device.name ?? "Unnamed Bluetooth device");
      const server = await device.gatt?.connect();
      const service = await server?.getPrimaryService(UART_SERVICE);
      const rx = await service?.getCharacteristic(UART_RX_CHARACTERISTIC);
      const tx = await service?.getCharacteristic(UART_TX_CHARACTERISTIC);

      if (!server || !service || !rx || !tx) throw new Error("That device is visible, but it does not expose the SignalFlare BLE chat service. A normal iPhone usually cannot be used directly as a Web Bluetooth chat node.");

      writeCharacteristic.current = rx;
      await tx.startNotifications();
      tx.addEventListener("characteristicvaluechanged", (event) => {
        const value = (event.target as unknown as BluetoothRemoteGATTCharacteristic).value;
        if (!value) return;
        const body = new TextDecoder().decode(value);
        addMessage(createMessage(body, "received", "received"));
      });

      setDeviceName(device.name ?? "Bluetooth responder node");
      setStatus("connected");
      addMessage(createMessage(`Connected to ${device.name ?? "Bluetooth responder node"}.`, "system", "system"));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Bluetooth pairing failed.";
      setError(message);
      setStatus("queued");
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;

    const encoded = new TextEncoder().encode(body);
    if (writeCharacteristic.current && status === "connected") {
      await writeCharacteristic.current.writeValue(encoded);
      addMessage(createMessage(body, "sent", "sent"));
    } else {
      setStatus(status === "unsupported" ? "unsupported" : "queued");
      addMessage(createMessage(body, "sent", "queued"));
    }
    setDraft("");
  }

  function addQuickMessage(body: string) {
    setDraft(body);
  }

  function clearHistory() {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="space-y-5">
      <div className="signal-card rounded-lg border border-white/10 p-5 shadow-cyber">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber/10 text-cyber shadow-cyber">
                <BluetoothConnected />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyber">Offline mesh communication</p>
                <h2 className="text-2xl font-black">Bluetooth Offline Chat</h2>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">{supportText}</p>
            {lastScannedDevice && <p className="mt-2 text-xs text-slate-400">Last selected device: {lastScannedDevice}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={pairDevice} disabled={status === "pairing" || status === "unsupported"} icon={<Search size={18} />}>
              {status === "pairing" ? "Scanning..." : "Scan Nearby Devices"}
            </Button>
            <Button variant="secondary" onClick={clearHistory}>Clear History</Button>
          </div>
        </div>
        {error && <div className="mt-4 rounded-lg border border-ember/30 bg-ember/10 p-3 text-sm text-ember">{error}</div>}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="space-y-4">
          <div className="glass rounded-lg p-5">
            <h3 className="flex items-center gap-2 text-lg font-black"><Radio className="text-cyber" /> Link status</h3>
            <div className="mt-5 grid gap-3">
              {[
                ["Bluetooth", status === "connected" ? "Connected" : status === "unsupported" ? "Unavailable" : "Ready to pair", Bluetooth],
                ["Internet", "Not required", WifiOff],
                ["iPhone direct", "Needs BLE app", Smartphone],
                ["Store forward", "Enabled", ShieldCheck],
                ["Emergency mode", "Quick alerts ready", Zap]
              ].map(([label, value, Icon]) => (
                <div key={String(label)} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                  <div className="flex items-center gap-2 text-slate-300"><Icon className="text-cyber" size={17} />{String(label)}</div>
                  <span className="text-sm font-bold text-white">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-lg p-5">
            <h3 className="flex items-center gap-2 text-lg font-black"><Info className="text-cyber" /> Why devices may not show</h3>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <div className="rounded-lg bg-white/5 p-3">
                <b className="text-white">Use Chrome or Edge on the laptop.</b>
                <p className="mt-1">Safari and iPhone browsers do not support Web Bluetooth for this website feature.</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <b className="text-white">A phone with Bluetooth on is not enough.</b>
                <p className="mt-1">The other device must advertise as a BLE peripheral with the SignalFlare/Nordic UART chat service.</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <b className="text-white">For phone-to-laptop chat, use a bridge app/device.</b>
                <p className="mt-1">Examples: ESP32 BLE UART firmware, nRF Connect peripheral mode, or a custom mobile app that advertises the UART service.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-lg p-5">
            <h3 className="flex items-center gap-2 text-lg font-black"><CircleAlert className="text-ember" /> Quick emergency messages</h3>
            <div className="mt-4 grid gap-2">
              {[
                "Need medical help at my location.",
                "We are trapped and need rescue.",
                "Food and water required urgently.",
                "Route blocked. Send alternate path.",
                "All safe. Moving to shelter."
              ].map((item) => (
                <button key={item} onClick={() => addQuickMessage(item)} className="rounded-lg border border-white/10 bg-white/5 p-3 text-left text-sm text-slate-200 transition hover:border-cyber hover:text-white">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="glass flex min-h-[620px] flex-col rounded-lg p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-black">Offline chat room</h3>
              <p className="mt-1 text-sm text-slate-400">Messages stay on this device if no Bluetooth node is connected.</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${status === "connected" ? "bg-mint/10 text-mint" : "bg-ember/10 text-ember"}`}>
              {status === "connected" ? "Live Bluetooth" : "Offline Queue"}
            </span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto py-5">
            {messages.length === 0 && (
              <div className="grid h-full min-h-80 place-items-center rounded-lg border border-dashed border-white/15 bg-white/5 p-8 text-center">
                <div>
                  <BluetoothConnected className="mx-auto text-cyber" size={42} />
                  <h4 className="mt-4 text-lg font-black">No offline messages yet</h4>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-300">
                    Pair a Bluetooth responder node or start typing. Messages can be queued locally during network failure.
                  </p>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.direction === "sent" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[82%] rounded-lg p-4 ${message.direction === "sent" ? "bg-cyber/15 text-white" : message.direction === "system" ? "bg-mint/10 text-mint" : "bg-white/8 text-white"}`}>
                  <p className="text-sm leading-6">{message.body}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">
                    {message.status} • {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <form className="flex gap-2 border-t border-white/10 pt-4" onSubmit={sendMessage}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyber"
              placeholder="Type an offline Bluetooth message"
            />
            <Button icon={<Send size={18} />}>Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
