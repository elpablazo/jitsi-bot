import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMeetingStore = create(
  persist(
    (set) => ({
      meeting: null,
      setMeeting: (meeting: string) => set(() => ({ meeting })),
      clearMeeting: () => set(() => ({ meeting: null })),
      nombre: null,
      setNombre: (nombre: string) => set(() => ({ nombre })),
      clearNombre: () => set(() => ({ nombre: null })),
      isSecretario: false,
      setIsSecretario: (isSecretario: boolean) => set(() => ({ isSecretario })),
    }),
    {
      name: "meeting-storage",
    }
  )
);
