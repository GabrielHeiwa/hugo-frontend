import { sessionStore } from "@/stores/session";
import { useStore } from "zustand";

export function useSession() {
    return {
        ...useStore(sessionStore)
    }
}