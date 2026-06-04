import type { Server } from "socket.io";

export function registerSockets(io: Server) {
  io.on("connection", (socket) => {
    socket.emit("notification", { title: "Connected to SignalFlare realtime network" });
    socket.on("chat:send", (message) => io.emit("chat:message", { id: crypto.randomUUID(), ...message, createdAt: new Date().toISOString() }));
    socket.on("volunteer:assigned", (task) => io.emit("volunteer:assigned", task));
    socket.on("resource:request", (resource) => io.emit("resource:updated", resource));
  });
}
