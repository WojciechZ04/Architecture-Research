/**
 * useLogout.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * W smart-ui dokładnie ten sam fragment kodu ("wywołaj signOut() z
 * react-auth-kit, potem nawiguj do /login") był zduplikowany w Home.tsx
 * i w Navbar.jsx. Tutaj wydzielony do jednego małego hooka.
 */

import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export function useLogout() {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/login");
  };

  return { logout };
}
