/**
 * tokenStorage.ts
 * -----------------------------------------------------------------------
 * WARSTWA: api
 *
 * W smart-ui `localStorage.getItem("token")` / `localStorage.setItem(...)`
 * było wpisane wprost w kilkunastu miejscach (Login.tsx, Signup.tsx,
 * Projects.tsx, Tasks.tsx, Home.tsx, Profile.tsx, każdy modal z fetch...).
 * Gdyby trzeba było zmienić mechanizm (np. na sessionStorage albo cookie),
 * trzeba by edytować kilkanaście plików.
 *
 * Tutaj "gdzie trzymamy token" jest zdefiniowane w JEDNYM miejscu.
 * To wciąż bardzo prosty wrapper (nie jest to jeszcze "port" w rozumieniu
 * clean architecture - tu nie ma interfejsu do podmiany implementacji,
 * to celowa różnica między wariantami).
 */
const TOKEN_KEY = "token";

export const tokenStorage = {
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  set(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
  },
};
