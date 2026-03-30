import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  teamRef: string;
  captainName:string
  managerName:string
  teamName:string
}



interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (data: { token: string; user: User }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      // Logic to save the serialized data
      setAuth: (data) => set({
        token: data.token,
        user: data.user
      }),

      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'zpl-auth-storage', // Key in localStorage
      storage: createJSONStorage(() => localStorage),
      // Optional: Partialize allows you to choose what to serialize
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);

interface TeamState {
  teamData: any;
  setTeamData: (data: any) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  teamData: null,
  setTeamData: (data) => set({ teamData: data }),
}));