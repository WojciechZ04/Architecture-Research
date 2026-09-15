/**
 * useLogin.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona logika z Login.tsx (smart-ui): stan formularza, wywołanie
 * API logowania, zapisanie tokena, integracja z react-auth-kit i
 * przekierowanie po sukcesie.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { authApi } from "../api/authApi";
import { tokenStorage } from "../api/tokenStorage";
import { ApiError } from "../api/httpClient";

export function useLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { token } = await authApi.login(username, password);
      tokenStorage.set(token);

      const signedIn = signIn({ auth: { token, type: "Bearer" } });
      if (signedIn) {
        navigate("/");
      }
    } catch (err) {
      // Zachowujemy dokładnie ten sam podział komunikatów co w smart-ui:
      // błąd zwrócony przez API (ApiError) -> zły login/hasło,
      // błąd sieci/inny -> komunikat ogólny.
      const message = err instanceof ApiError ? "Invalid username or password" : "An error occurred. Please try again later.";
      setLoginError(message);
    }
  };

  return { username, setUsername, password, setPassword, loginError, handleSubmit };
}
