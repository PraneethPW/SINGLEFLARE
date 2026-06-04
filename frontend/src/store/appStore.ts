import { create } from "zustand";
import type { Role } from "../types/domain";

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  emergencyMode: boolean;
  setEmergencyMode: (active: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  role: "Citizen",
  setRole: (role) => set({ role }),
  emergencyMode: false,
  setEmergencyMode: (active) => set({ emergencyMode: active })
}));
